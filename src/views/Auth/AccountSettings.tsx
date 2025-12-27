import React, { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";

const AccountSettings: React.FC = () => {
  const { user, updateProfile, changePassword, updateAvatar } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar ?? null
  );
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <p>Bạn cần đăng nhập để thay đổi thông tin.</p>
      </div>
    );
  }

  const handleName = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateProfile(name.trim());
    setMsg(ok ? "Cập nhật tên thành công" : "Không thể cập nhật tên");
  };

  const handleAvatarPick = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarPreview) {
      setMsg("Chưa có avatar để lưu");
      return;
    }
    const ok = await updateAvatar(avatarPreview);
    setMsg(ok ? "Avatar đã được cập nhật" : "Cập nhật avatar thất bại");
  };

  const handleAvatarRemove = async () => {
    const ok = await updateAvatar(null);
    if (ok) setAvatarPreview(null);
    setMsg(ok ? "Avatar đã bị xóa" : "Xóa avatar thất bại");
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (newPwd.length < 8) {
      setMsg("Mật khẩu mới phải có ít nhất 8 ký tự");
      return;
    }
    if (newPwd !== confirmPwd) {
      setMsg("Xác nhận mật khẩu không khớp");
      return;
    }
    const ok = await changePassword(oldPwd, newPwd);
    setMsg(ok ? "Mật khẩu đã được thay đổi" : "Mật khẩu cũ không đúng");
    if (ok) {
      setOldPwd("");
      setNewPwd("");
      setConfirmPwd("");
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-xl md:grid-cols-3 dark:bg-gray-800">
        <div className="col-span-1 flex flex-col items-center gap-4">
          <div className="h-28 w-28 overflow-hidden rounded-full bg-gray-100 shadow-md">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-gray-500">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              {user?.name}
            </div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <input
              ref={fileRef}
              onChange={(e) => handleAvatarPick(e.target.files?.[0])}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Chọn ảnh
            </button>
            <button
              onClick={handleAvatarSave}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
            >
              Lưu ảnh
            </button>
            <button
              type="button"
              onClick={handleAvatarRemove}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Xóa ảnh
            </button>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Cài đặt tài khoản</h1>
            {msg && <div className="text-sm text-green-600">{msg}</div>}
          </div>

          <form
            onSubmit={handleName}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600">
                Họ và tên
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <div className="sm:col-span-2">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                Lưu thay đổi
              </button>
            </div>
          </form>

          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Đổi mật khẩu
            </h2>
            <form onSubmit={handlePassword} className="mt-3 grid gap-3">
              <input
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
                placeholder="Mật khẩu hiện tại"
                type="password"
                className="w-full rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
              />
              <input
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                placeholder="Mật khẩu mới"
                type="password"
                className="w-full rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
              />
              <input
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder="Xác nhận mật khẩu mới"
                type="password"
                className="w-full rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
              />
              <div className="flex justify-end">
                <button className="rounded-lg bg-green-600 px-4 py-2 text-white">
                  Thay đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
