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
    className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 opacity-0 transition hover:bg-white dark:bg-gray-800/70 dark:hover:bg-gray-700"
    style={{ [direction === "prev" ? "left" : "right"]: "1rem" }}
  >
    {direction === "prev" ? (
      <ChevronLeft className="h-5 w-5 text-gray-800 dark:text-gray-200" />
    ) : (
      <ChevronRight className="h-5 w-5 text-gray-800 dark:text-gray-200" />
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
  <div className="absolute right-0 bottom-3 left-0 flex justify-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        aria-label={`Slide ${i + 1}`}
        className={`h-3 w-3 cursor-pointer rounded-full transition-all ${
          i === current ? "scale-110 bg-white" : "bg-gray-400/70"
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
    <div className="group relative w-full overflow-hidden rounded-2xl shadow-xl">
      <img
        src={bannerData[index]}
        alt="Banner"
        className="h-[420px] w-full scale-100 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10" />

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
