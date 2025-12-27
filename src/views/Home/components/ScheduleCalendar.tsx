import { useEffect, useMemo, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay
} from "date-fns";

type ScheduleItem = {
  id: string;
  date: string; // YYYY-MM-DD
  shift: string;
  studentName: string;
  studentEmail: string;
};

const STORAGE_KEY = "duty:schedules:v1";

const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const ScheduleCalendar = () => {
  const [current, setCurrent] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSchedules(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const monthStart = useMemo(() => startOfMonth(current), [current]);
  const monthEnd = useMemo(() => endOfMonth(monthStart), [monthStart]);
  const startDate = useMemo(() => startOfWeek(monthStart), [monthStart]);
  const endDate = useMemo(() => endOfWeek(monthEnd), [monthEnd]);

  const days: Date[] = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    day = addDays(day as any, 1) as Date;
  }

  const eventsByDate = useMemo(() => {
    const map: Record<string, ScheduleItem[]> = {};
    schedules.forEach((s) => {
      map[s.date] = map[s.date] || [];
      map[s.date].push(s);
    });
    return map;
  }, [schedules]);

  const prevMonth = () => setCurrent((d) => addDays(startOfMonth(d), -1));
  const nextMonth = () => setCurrent((d) => addDays(endOfMonth(d), 1));

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Lịch trực</h2>
          <p className="text-sm text-gray-500">Xem lịch trực theo tháng</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="rounded border px-3 py-1">
            ‹
          </button>
          <div className="px-3 py-1 font-medium">
            {format(monthStart, "MMMM yyyy")}
          </div>
          <button onClick={nextMonth} className="rounded border px-3 py-1">
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WeekDays.map((wd) => (
          <div
            key={wd}
            className="py-2 text-center text-xs font-semibold text-gray-600"
          >
            {wd}
          </div>
        ))}

        {days.map((d) => {
          const key = format(d, "yyyy-MM-dd");
          const events = eventsByDate[key] || [];
          const inMonth = isSameMonth(d, monthStart);
          return (
            <div
              key={key}
              className={`min-h-[90px] overflow-hidden rounded-lg border p-2 text-sm ${inMonth ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900/60"}`}
            >
              <div
                className={`mb-1 flex items-center justify-between ${isSameDay(d, new Date()) ? "text-blue-600" : "text-gray-700 dark:text-gray-300"}`}
              >
                <div className="text-xs font-medium">{format(d, "d")}</div>
              </div>
              <div className="space-y-1">
                {events.slice(0, 3).map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
                  >
                    <div className="font-semibold">{ev.studentName}</div>
                    <div className="text-[11px] opacity-80">{ev.shift}</div>
                  </div>
                ))}
                {events.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{events.length - 3} thêm
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleCalendar;
