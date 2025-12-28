import { Clock, Calendar, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

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

const DateDisplay = ({ time }: { time: Date }) => (
  <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-blue-100">
    <Calendar className="h-4 w-4" />
    {time.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      weekday: "long",
      year: "numeric"
    })}
  </div>
);

const MottoSection = () => (
  <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
    <Sparkles className="absolute top-3 right-3 h-4 w-4 text-yellow-300" />
    <p className="relative text-center text-sm leading-relaxed font-medium text-white italic">
      Chủ đề năm học 2025–2026: Sáng tạo – Hội nhập – Phát triển
    </p>
  </div>
);

export const DigitalClock = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-6 shadow-lg shadow-blue-500/30 transition-shadow hover:shadow-xl hover:shadow-blue-500/40 dark:border-blue-700/50 dark:from-blue-900 dark:via-blue-950 dark:to-gray-900">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-white drop-shadow" />
        <span className="text-sm font-semibold text-white drop-shadow">
          Thời gian hiện tại
        </span>
      </div>

      <ClockDisplay time={time} />
      <DateDisplay time={time} />
      <MottoSection />
    </div>
  );
};
