import { Clock, Calendar, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const padZero = (value: number): string =>
  value < 10 ? `0${value}` : `${value}`;

const ClockDisplay = ({ time }: { time: Date }) => (
  <div className="mb-2 text-center">
    <div className="text-5xl font-bold tracking-tight">
      {padZero(time.getHours())}:{padZero(time.getMinutes())}
      <span className="text-3xl text-blue-300">
        :{padZero(time.getSeconds())}
      </span>
    </div>
  </div>
);

const DateDisplay = ({ time }: { time: Date }) => (
  <div className="mb-4 flex items-center justify-center gap-2 text-sm text-blue-200">
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
  <div className="relative rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
    <Sparkles className="absolute top-2 right-2 h-4 w-4 text-yellow-300" />
    <p className="text-center text-sm leading-relaxed text-blue-50 italic">
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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-6 text-white shadow-2xl shadow-blue-500/30">
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/5 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-blue-200" />
          <span className="text-sm font-semibold text-blue-200">
            Thời gian hiện tại
          </span>
        </div>

        <ClockDisplay time={time} />
        <DateDisplay time={time} />
        <MottoSection />
      </div>
    </div>
  );
};
