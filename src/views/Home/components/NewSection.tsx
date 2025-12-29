import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import { newsData } from "@/dataSources/news";
import { useTranslation } from "react-i18next";

const NewsHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-300 dark:to-blue-500">
          {t("home.newsAndEvents")}
        </h2>
        <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {t("home.latestUpdates")}
        </p>
      </div>
      <button
        className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
        aria-label={t("home.viewAll")}
      >
        {t("home.viewAll")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

const NewsCard = ({ news }: { news: (typeof newsData)[0] }) => {
  const { t } = useTranslation();
  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-xl shadow-gray-200/50 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-blue-200/50 dark:border-gray-700/50 dark:bg-gray-800 dark:shadow-gray-900/50"
      onClick={() => window.open(news.url, "_blank")}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          window.open(news.url, "_blank");
        }
      }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={news.img}
          alt={news.title}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="rounded-xl bg-white/95 px-4 py-1.5 text-xs font-bold text-blue-700 shadow-lg backdrop-blur-md dark:bg-gray-900/95 dark:text-blue-300">
            {news.category}
          </span>
        </div>

        {news.trending && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 rounded-xl border border-red-300 bg-white/95 px-3 py-1.5 text-xs font-bold text-red-600 shadow-lg backdrop-blur-md dark:border-red-800/50 dark:bg-gray-900/95 dark:text-red-400">
              <TrendingUp className="h-3.5 w-3.5" />
              {t("home.hot")}
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3.5 w-3.5" />
          {news.date}
        </div>

        <h3 className="line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-700 dark:text-gray-100 dark:group-hover:text-blue-300">
          {news.title}
        </h3>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-700 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-300">
          {t("home.readMore")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors group-hover:border-blue-200 dark:group-hover:border-blue-400" />
    </article>
  );
};

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
