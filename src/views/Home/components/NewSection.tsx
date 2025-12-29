import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import { newsData } from "@/dataSources/news";
import { useTranslation } from "react-i18next";

const NewsHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t("home.newsAndEvents")}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t("home.latestUpdates")}
        </p>
      </div>
      <button
        className="group dark:hover:bg-gray-750 flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        aria-label={t("home.viewAll")}
      >
        {t("home.viewAll")}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};

const NewsCard = ({ news }: { news: (typeof newsData)[0] }) => {
  const { t } = useTranslation();
  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-blue-500 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-600"
      onClick={() => window.open(news.url, "_blank")}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          window.open(news.url, "_blank");
        }
      }}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={news.img}
          alt={news.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="absolute top-2 left-2">
          <span className="rounded bg-white px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            {news.category}
          </span>
        </div>

        {news.trending && (
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-1 rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
              <TrendingUp className="h-3 w-3" />
              {t("home.hot")}
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          {news.date}
        </div>

        <h3 className="line-clamp-2 text-sm leading-tight font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {news.title}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
          {t("home.readMore")}
          <ArrowRight className="h-3 w-3" />
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
