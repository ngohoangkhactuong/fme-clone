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
import { vi } from "date-fns/locale";
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from "lucide-react";

type ScheduleItem = {
  id: string;
  date: string; // YYYY-MM-DD
  shift: string;
  studentName: string;
  studentEmail: string;
};

const STORAGE_KEY = "duty:schedules:v1";

const WeekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export const ScheduleCalendar = () => {
  const [current, setCurrent] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
  const goToday = () => setCurrent(new Date());

  const selectedEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Lịch trực
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Xem và theo dõi lịch trực theo tháng
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goToday}
              className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
            >
              Hôm nay
            </button>
            <div className="flex items-center gap-1 rounded-xl bg-white p-1 shadow-lg shadow-gray-200/50 dark:bg-gray-800 dark:shadow-black/20">
              <button
                onClick={prevMonth}
                className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="min-w-[160px] px-3 py-2 text-center font-semibold text-gray-900 dark:text-white">
                {format(monthStart, "MMMM yyyy", { locale: vi })}
              </div>
              <button
                onClick={nextMonth}
                className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/50 dark:bg-gray-800 dark:shadow-black/20">
            {/* Week Header */}
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
              {WeekDays.map((wd, i) => (
                <div
                  key={wd}
                  className={`py-3 text-center text-xs font-bold tracking-wide uppercase ${
                    i === 0
                      ? "text-red-500"
                      : i === 6
                        ? "text-blue-500"
                        : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {wd}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7">
              {days.map((d, idx) => {
                const key = format(d, "yyyy-MM-dd");
                const events = eventsByDate[key] || [];
                const inMonth = isSameMonth(d, monthStart);
                const isToday = isSameDay(d, new Date());
                const isSelected = selectedDate === key;
                const dayOfWeek = d.getDay();

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(key)}
                    className={`group relative min-h-[100px] border-r border-b border-gray-100 p-2 text-left transition-all hover:bg-blue-50/50 dark:border-gray-700/50 dark:hover:bg-blue-900/20 ${
                      !inMonth ? "bg-gray-50/50 dark:bg-gray-900/30" : ""
                    } ${isSelected ? "bg-blue-50 ring-2 ring-blue-500 ring-inset dark:bg-blue-900/30" : ""} ${
                      idx % 7 === 6 ? "border-r-0" : ""
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all ${
                          isToday
                            ? "bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white shadow-md"
                            : inMonth
                              ? dayOfWeek === 0
                                ? "text-red-500"
                                : dayOfWeek === 6
                                  ? "text-blue-500"
                                  : "text-gray-900 group-hover:bg-gray-200 dark:text-gray-100 dark:group-hover:bg-gray-700"
                              : "text-gray-400 dark:text-gray-600"
                        }`}
                      >
                        {format(d, "d")}
                      </span>
                      {events.length > 0 && (
                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
                          {events.length}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      {events.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className="truncate rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-2 py-1 text-[10px] font-medium text-white shadow-sm"
                        >
                          {ev.studentName}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-center text-[10px] font-medium text-gray-500 dark:text-gray-400">
                          +{events.length - 2} khác
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Selected Date Info */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/50 dark:bg-gray-800 dark:shadow-black/20">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-5">
              <h3 className="text-lg font-bold text-white">
                {selectedDate
                  ? format(new Date(selectedDate), "EEEE, d MMMM", {
                      locale: vi
                    })
                  : "Chọn ngày để xem chi tiết"}
              </h3>
              {selectedDate && (
                <p className="mt-1 text-sm text-blue-100">
                  {selectedEvents.length} ca trực được xếp lịch
                </p>
              )}
            </div>

            <div className="p-5">
              {selectedEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="group rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:border-blue-200 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-800 dark:hover:bg-blue-900/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 font-bold text-white shadow-md">
                          {ev.studentName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {ev.studentName}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {ev.studentEmail}
                          </p>
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                            <Clock className="h-3.5 w-3.5" />
                            {ev.shift}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedDate ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Không có ca trực nào trong ngày này
                  </p>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nhấn vào một ngày để xem chi tiết
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white shadow-lg shadow-blue-500/30">
              <p className="text-sm font-medium text-blue-100">Tổng ca trực</p>
              <p className="mt-1 text-3xl font-bold">{schedules.length}</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-5 text-white shadow-lg shadow-purple-500/30">
              <p className="text-sm font-medium text-indigo-100">Tháng này</p>
              <p className="mt-1 text-3xl font-bold">
                {
                  schedules.filter((s) => {
                    const d = new Date(s.date);
                    return (
                      d.getMonth() === monthStart.getMonth() &&
                      d.getFullYear() === monthStart.getFullYear()
                    );
                  }).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
