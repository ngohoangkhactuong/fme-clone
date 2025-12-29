import { Clock, Calendar, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const padZero = (value: number): string =>
  value < 10 ? `0${value}` : `${value}`;

const ClockDisplay = ({ time }: { time: Date }) => (
  <div className="mb-3 text-center">
    <div className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
      {padZero(time.getHours())}:{padZero(time.getMinutes())}
      <span className="text-2xl text-blue-200">
        :{padZero(time.getSeconds())}
      </span>
    </div>
  </div>
);

const DateDisplay = ({ time, locale }: { time: Date; locale: string }) => (
  <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-blue-100">
    <Calendar className="h-4 w-4" />
    {time.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
      day: "numeric",
      month: "long",
      weekday: "long",
      year: "numeric"
    })}
  </div>
);

const MottoSection = () => {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
      <Sparkles className="absolute top-2 right-2 h-3.5 w-3.5 text-yellow-300" />
      <p className="relative text-center text-xs leading-relaxed text-white/90 italic">
        {t("home.academicYearMotto")}
      </p>
    </div>
  );
};

export const DigitalClock = () => {
  const [time, setTime] = useState<Date>(new Date());
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-5 shadow-sm dark:border-gray-800 dark:from-blue-900 dark:via-blue-950 dark:to-gray-900">
      <div className="mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4 text-white/90 drop-shadow" />
        <span className="text-sm font-medium text-white/90 drop-shadow">
          {t("home.currentTime")}
        </span>
      </div>

      <ClockDisplay time={time} />
      <DateDisplay time={time} locale={i18n.language} />
      <MottoSection />
    </div>
  );
};
