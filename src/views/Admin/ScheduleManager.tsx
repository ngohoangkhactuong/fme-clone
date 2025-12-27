import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Notification } from "@/components/layout/Notification";

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
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-800">
          <h2 className="text-xl font-bold">Quyền truy cập bị từ chối</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Chỉ admin mới có thể quản lý lịch trực.
          </p>
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quản lý lịch trực (Admin)</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Tạo lịch trực cho sinh viên và quản lý các ca trực.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-lg md:col-span-1 dark:bg-gray-800">
          <h3 className="text-lg font-semibold">Thêm lịch</h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                Ngày
              </label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                Ca trực
              </label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900"
              >
                {DEFAULT_SHIFTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                Họ và tên
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                Email sinh viên
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mssv@student.hcmute.edu.vn"
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900"
              />
            </div>

            <div className="mt-3 flex gap-3">
              <button
                onClick={addSchedule}
                type="button"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white"
              >
                Thêm
              </button>
              <button
                onClick={() => {
                  setDate("");
                  setName("");
                  setEmail("");
                }}
                type="button"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg md:col-span-2 dark:bg-gray-800">
          <h3 className="text-lg font-semibold">Lịch trực (danh sách)</h3>
          <div className="mt-4 space-y-3">
            {schedules.length === 0 && (
              <p className="text-sm text-gray-500">Chưa có lịch.</p>
            )}
            {schedules.map((it) => (
              <div
                key={it.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-700"
              >
                <div>
                  <div className="text-sm font-semibold">
                    {it.studentName}{" "}
                    <span className="text-xs text-gray-500">
                      ({it.studentEmail})
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {it.date} — {it.shift}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeSchedule(it.id)}
                    className="text-sm text-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Xem lịch trên calendar</h3>
        <div className="mt-4">
          <iframe
            title="Lịch trực"
            src="/calendar"
            className="h-[520px] w-full rounded-2xl border-0"
          />
        </div>
      </div>

      {notif && <Notification message={notif} onClose={() => setNotif(null)} />}
    </div>
  );
};

export default ScheduleManager;
