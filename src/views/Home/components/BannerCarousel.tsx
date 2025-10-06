import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bannerData } from "@/dataSources/banner";

export const BannerCarousel: React.FC = () => {
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
      <div className="absolute inset-0 bg-black/10"></div>
      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/70 p-2 opacity-0 transition group-hover:opacity-100 hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5 text-gray-800" />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/70 p-2 opacity-0 transition group-hover:opacity-100 hover:bg-white"
      >
        <ChevronRight className="h-5 w-5 text-gray-800" />
      </button>
      <div className="absolute right-0 bottom-3 left-0 flex justify-center gap-2">
        {bannerData.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 cursor-pointer rounded-full transition-all ${
              i === index ? "scale-110 bg-white" : "bg-gray-400/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
