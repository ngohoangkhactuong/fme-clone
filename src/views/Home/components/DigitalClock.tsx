import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const formatTime = (n: number) => (n < 10 ? `0${n}` : n);

export const DigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-5 text-white shadow-lg">
      <Clock className="mb-2 h-10 w-10" />
      <div className="text-3xl font-bold tracking-wide">
        {formatTime(time.getHours())}:{formatTime(time.getMinutes())}:
        {formatTime(time.getSeconds())}
      </div>
      <p className="mt-2 text-center text-sm text-blue-200 italic">
        “Chủ đề năm học 2025–2026: Sáng tạo – Hội nhập – Phát triển”
      </p>
    </div>
  );
};
