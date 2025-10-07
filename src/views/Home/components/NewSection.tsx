import { newsData } from "@/dataSources/news";
import { ArrowRight, TrendingUp, Calendar } from "lucide-react";

export const NewsSection = () => (
  <section className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Tin tức & Sự kiện
          </span>
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Cập nhật những thông tin mới nhất
        </p>
      </div>
      <button className="group flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-100">
        Xem tất cả
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {newsData.map((news) => (
        <article
          key={news.title}
          onClick={() => window.open(news.url, "_blank")}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-500/5 transition-all hover:shadow-2xl hover:shadow-blue-500/10"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={news.img}
              alt={news.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur-sm">
                {news.category}
              </span>
            </div>

            {news.trending && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 text-xs font-semibold text-white shadow-lg">
                  <TrendingUp className="h-3 w-3" />
                  Hot
                </div>
              </div>
            )}
          </div>

          <div className="p-5">
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3.5 w-3.5" />
              {news.date}
            </div>

            <h3 className="line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-blue-600">
              {news.title}
            </h3>

            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
              Đọc thêm
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors group-hover:border-blue-200"></div>
        </article>
      ))}
    </div>
  </section>
);
