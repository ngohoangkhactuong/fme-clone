import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import { newsData } from "@/dataSources/news";
import { useTranslation } from "react-i18next";

const NewsHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent dark:from-gray-100 dark:to-gray-300">
          {t("home.newsAndEvents")}
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {t("home.latestUpdates")}
        </p>
      </div>
      <button
        className="group flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
        aria-label={t("home.viewAll")}
      >
        {t("home.viewAll")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};

const NewsCard = ({ news }: { news: (typeof newsData)[0] }) => {
  const { t } = useTranslation();
  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
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
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="rounded-lg bg-white/95 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-sm dark:bg-gray-900/95 dark:text-blue-400">
            {news.category}
          </span>
        </div>

        {news.trending && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 rounded-lg bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow-sm">
              <TrendingUp className="h-3 w-3" />
              {t("home.hot")}
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3.5 w-3.5" />
          {news.date}
        </div>

        <h3 className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {news.title}
        </h3>

        <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
          {t("home.readMore")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
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
