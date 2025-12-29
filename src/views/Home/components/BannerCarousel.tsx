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
    className="absolute top-1/2 -translate-y-1/2 rounded bg-white/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
    style={{ [direction === "prev" ? "left" : "right"]: "0.75rem" }}
  >
    {direction === "prev" ? (
      <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-200" />
    ) : (
      <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-200" />
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
  <div className="absolute right-0 bottom-3 left-0 flex justify-center gap-1">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        aria-label={`Slide ${i + 1}`}
        className={`h-1.5 cursor-pointer rounded-full transition-all ${
          i === current ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"
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
    <div className="group relative w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      <img
        src={bannerData[index]}
        alt="Banner"
        className="h-[360px] w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-102"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

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
