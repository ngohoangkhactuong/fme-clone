import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import { newsData } from "@/dataSources/news";

const NewsHeader = () => (
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-3xl font-bold">
        <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
          Tin tức & Sự kiện
        </span>
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Cập nhật những thông tin mới nhất
      </p>
    </div>
    <button
      className="group flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700"
      aria-label="Xem tất cả tin tức"
    >
      Xem tất cả
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  </div>
);

const NewsCard = ({ news }: { news: (typeof newsData)[0] }) => (
  <article
    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-500/5 transition-all hover:shadow-2xl hover:shadow-blue-500/10 dark:bg-gray-800 dark:shadow-black/20 dark:hover:shadow-black/30"
    onClick={() => window.open(news.url, "_blank")}
    role="link"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        window.open(news.url, "_blank");
      }
    }}
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={news.img}
        alt={news.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute top-3 left-3">
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur-sm dark:bg-gray-900/80 dark:text-blue-300">
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
      <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="h-3.5 w-3.5" />
        {news.date}
      </div>

      <h3 className="line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
        {news.title}
      </h3>

      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
        Đọc thêm
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>

    <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors group-hover:border-blue-200 dark:group-hover:border-blue-500/50" />
  </article>
);

export const NewsSection = () => (
  <section className="space-y-6">
    <NewsHeader />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {newsData.map((news) => (
        <NewsCard key={news.title} news={news} />
      ))}
    </div>
  </section>
);
