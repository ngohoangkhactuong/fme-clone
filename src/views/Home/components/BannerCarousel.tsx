import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { bannerData } from "@/dataSources/banner";

const BannerNavButton = ({
  direction,
  onClick
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={direction === "prev" ? "Slide trước" : "Slide tiếp theo"}
    className="absolute top-1/2 -translate-y-1/2 rounded-lg bg-white/90 p-2 opacity-0 shadow-md ring-1 ring-gray-900/5 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-white hover:shadow-lg dark:bg-gray-900/90 dark:ring-white/10 dark:hover:bg-gray-800"
    style={{ [direction === "prev" ? "left" : "right"]: "1rem" }}
  >
    {direction === "prev" ? (
      <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" />
    ) : (
      <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-200" />
    )}
  </button>
);

const BannerIndicators = ({
  current,
  total,
  onSelect
}: {
  current: number;
  total: number;
  onSelect: (index: number) => void;
}) => (
  <div className="absolute right-0 bottom-4 left-0 flex justify-center gap-1.5">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        aria-label={`Slide ${i + 1}`}
        className={`h-2 cursor-pointer rounded-full transition-all ${
          i === current
            ? "w-8 bg-white shadow-md"
            : "w-2 bg-white/50 hover:bg-white/75"
        }`}
      />
    ))}
  </div>
);

export const BannerCarousel = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % bannerData.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + bannerData.length) % bannerData.length);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-900/5 dark:shadow-gray-950/50 dark:ring-white/5">
      <img
        src={bannerData[index]}
        alt="Banner"
        className="h-[420px] w-full scale-100 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

      <BannerNavButton direction="prev" onClick={prev} />
      <BannerNavButton direction="next" onClick={next} />

      <BannerIndicators
        current={index}
        onSelect={setIndex}
        total={bannerData.length}
      />
    </div>
  );
};
