import React, { useEffect, useRef, useState } from "react";

type ImageUploaderProps = {
  images: string[];
  onChange: (images: string[]) => void;
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [local, setLocal] = useState<string[]>(images || []);
  const [full, setFull] = useState<string | null>(null);

  useEffect(() => setLocal(images || []), [images]);

  useEffect(() => onChange(local), [local, onChange]);

  useEffect(
    () => () => {
      // revoke created object URLs stored in local state when unmounting
      local.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch (err) {
          void err;
        }
      });
    },
    [local]
  );

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const urls: string[] = [];
    Array.from(files).forEach((f) => {
      if (!f.type.startsWith("image/")) return;
      const url = URL.createObjectURL(f);
      urls.push(url);
    });
    setLocal((prev) => [...prev, ...urls]);
  };

  const remove = (idx: number) => {
    setLocal((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(idx, 1);
      try {
        URL.revokeObjectURL(removed);
      } catch (err) {
        void err;
      }
      return copy;
    });
  };

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-md border border-gray-200 px-3 py-2 text-sm dark:border-gray-600"
        >
          Thêm ảnh
        </button>
        <p className="text-sm text-gray-500">
          Hỗ trợ kéo thả hoặc chọn nhiều ảnh (jpg, png)
        </p>
      </div>

      <input
        ref={inputRef}
        onChange={(e) => handleFiles(e.target.files)}
        multiple
        accept="image/*"
        type="file"
        className="hidden"
        aria-hidden
      />

      <div className="grid grid-cols-3 gap-3">
        {local.length === 0 && (
          <div className="col-span-3 rounded-md border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500 dark:border-gray-700">
            Chưa có ảnh đính kèm
          </div>
        )}

        {local.map((src, idx) => (
          <div key={src} className="relative">
            <button
              onClick={() => setFull(src)}
              className="block h-28 w-full overflow-hidden rounded-md bg-gray-100"
              aria-label={`Xem ảnh ${idx + 1}`}
            >
              <img
                src={src}
                alt={`attachment-${idx}`}
                className="h-full w-full object-cover"
              />
            </button>
            <button
              onClick={() => remove(idx)}
              className="absolute top-2 right-2 rounded-full bg-white/80 p-1 text-xs shadow"
              aria-label={`Xóa ảnh ${idx + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {full && (
        <div
          role="dialog"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setFull(null)}
        >
          <img
            src={full}
            alt="full"
            className="max-h-full max-w-full rounded-md shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
