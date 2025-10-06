import React from "react";
import { newsData } from "@/dataSources/news";

export const NewsSection: React.FC = () => {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold text-[#1E3A8A]">
        Tin tức & Sự kiện
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {newsData.map((n) => (
          <article
            key={n.title}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
          >
            <div className="overflow-hidden">
              <img
                src={n.img}
                alt={n.title}
                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500">{n.date}</p>
              <h3 className="mt-2 font-semibold text-gray-800 transition group-hover:text-blue-600">
                {n.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
