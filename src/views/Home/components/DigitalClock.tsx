import { Clock, Calendar, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const padZero = (value: number): string =>
  value < 10 ? `0${value}` : `${value}`;

const ClockDisplay = ({ time }: { time: Date }) => (
  <div className="mb-2.5 text-center">
    <div className="text-3xl font-bold tracking-tight text-white">
      {padZero(time.getHours())}:{padZero(time.getMinutes())}
      <span className="text-xl text-blue-200">
        :{padZero(time.getSeconds())}
      </span>
    </div>
  </div>
);

const DateDisplay = ({ time, locale }: { time: Date; locale: string }) => (
  <div className="mb-3 flex items-center justify-center gap-1.5 text-xs font-medium text-blue-100">
    <Calendar className="h-3.5 w-3.5" />
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
    <div className="relative overflow-hidden rounded border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
      <Sparkles className="absolute top-2 right-2 h-3.5 w-3.5 text-yellow-300" />
      <p className="relative text-center text-xs leading-relaxed text-white/95 italic">
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
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-br from-blue-600 to-blue-700 p-4 dark:border-gray-800 dark:from-blue-800 dark:to-blue-900">
      <div className="mb-3 flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-white/90" />
        <span className="text-xs font-medium text-white/90">
          {t("home.currentTime")}
        </span>
      </div>

      <ClockDisplay time={time} />
      <DateDisplay time={time} locale={i18n.language} />
      <MottoSection />
    </div>
  );
};
