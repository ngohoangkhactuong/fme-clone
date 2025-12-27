import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Notification } from "@/components/layout/Notification";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  User,
  Mail,
  ShieldAlert,
  CalendarCheck
} from "lucide-react";

type ScheduleItem = {
  id: string;
  date: string; // YYYY-MM-DD
  shift: string; // e.g. "Sáng (7:30 - 11:30)"
  studentName: string;
  studentEmail: string;
};

const STORAGE_KEY = "duty:schedules:v1";

const DEFAULT_SHIFTS = [
  "Sáng (7:30 - 11:30)",
  "Chiều (13:30 - 17:30)",
  "Tối (17:30 - 21:30)"
];

const seedIfEmpty = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const sample: ScheduleItem[] = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
  }
};

export const ScheduleManager = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [date, setDate] = useState<string>("");
  const [shift, setShift] = useState<string>(DEFAULT_SHIFTS[0]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notif, setNotif] = useState<string | null>(null);

  useEffect(() => {
    seedIfEmpty();
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setSchedules(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  }, [schedules]);

  if (!user || user.role !== "admin") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg items-center justify-center px-4 py-12">
        <div className="w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-gray-200/50 dark:bg-gray-800 dark:shadow-black/20">
          <div className="bg-gradient-to-br from-red-500 to-orange-500 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <ShieldAlert className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Quyền truy cập bị từ chối
            </h2>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Chỉ quản trị viên mới có thể truy cập trang quản lý lịch trực.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const addSchedule = () => {
    if (!date || !name || !email) {
      setNotif("Vui lòng điền đủ thông tin.");
      return;
    }
    const item: ScheduleItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      date,
      shift,
      studentName: name,
      studentEmail: email
    };
    setSchedules((s) => [item, ...s]);
    setNotif("Đã thêm lịch trực.");
    setName("");
    setEmail("");
  };

  const removeSchedule = (id: string) => {
    setSchedules((s) => s.filter((it) => it.id !== id));
    setNotif("Đã xóa lịch trực.");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30">
            <CalendarCheck className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Quản lý lịch trực
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Tạo và quản lý lịch trực cho sinh viên
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Add Schedule Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50 dark:bg-gray-800 dark:shadow-black/20">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <Plus className="h-5 w-5" />
                Thêm lịch mới
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Ngày
                  </label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-900"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Clock className="h-4 w-4 text-gray-400" />
                    Ca trực
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-900"
                  >
                    {DEFAULT_SHIFTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <User className="h-4 w-4 text-gray-400" />
                    Họ và tên
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-900"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Mail className="h-4 w-4 text-gray-400" />
                    Email sinh viên
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mssv@student.hcmute.edu.vn"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-900"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={addSchedule}
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40"
                  >
                    <Plus className="h-4 w-4" />
                    Thêm lịch
                  </button>
                  <button
                    onClick={() => {
                      setDate("");
                      setName("");
                      setEmail("");
                    }}
                    type="button"
                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule List */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50 dark:bg-gray-800 dark:shadow-black/20">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-gray-700">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                <Calendar className="h-5 w-5 text-indigo-600" />
                Danh sách lịch trực
              </h3>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {schedules.length} lịch
              </span>
            </div>

            <div className="max-h-[500px] overflow-y-auto p-4">
              {schedules.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Chưa có lịch trực nào
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Hãy thêm lịch trực đầu tiên
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {schedules.map((it) => (
                    <div
                      key={it.id}
                      className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:border-indigo-800 dark:hover:bg-indigo-900/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 font-bold text-white shadow-md">
                          {it.studentName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {it.studentName}
                            </span>
                            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                              {it.studentEmail}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(it.date).toLocaleDateString("vi-VN", {
                                weekday: "short",
                                day: "numeric",
                                month: "short"
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {it.shift}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeSchedule(it.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {notif && <Notification message={notif} onClose={() => setNotif(null)} />}
    </div>
  );
};

export default ScheduleManager;
