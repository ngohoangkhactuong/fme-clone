import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Notification } from "@/components/layout/Notification";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  User,
  Mail,
  ShieldAlert,
  CalendarCheck,
  Check
} from "lucide-react";

type ScheduleItem = {
  id: string;
  date: string; // YYYY-MM-DD
  shift: string; // e.g. "Sáng (7:30 - 11:30)"
  studentName: string;
  studentEmail: string;
  confirmed?: boolean;
  confirmedBy?: string;
  confirmedAt?: string;
};

const STORAGE_KEY = "duty:schedules:v1";

const DEFAULT_SHIFTS = [
  "Sáng (7:30 - 11:30)",
  "Chiều (13:30 - 17:30)",
  "Tối (17:30 - 21:30)"
];

const formatDate = (d: Date) => d.toISOString().slice(0, 10);

const seedIfEmpty = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const today = new Date();
    const sample: ScheduleItem[] = [
      {
        id: `s-${Date.now()}-1`,
        date: formatDate(today),
        shift: DEFAULT_SHIFTS[0],
        studentName: "Nguyễn Văn A",
        studentEmail: "20190001@student.hcmute.edu.vn"
      },
      {
        id: `s-${Date.now()}-2`,
        date: formatDate(
          new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        ),
        shift: DEFAULT_SHIFTS[1],
        studentName: "Trần Thị B",
        studentEmail: "20190002@student.hcmute.edu.vn"
      },
      {
        id: `s-${Date.now()}-3`,
        date: formatDate(
          new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)
        ),
        shift: DEFAULT_SHIFTS[2],
        studentName: "Lê Văn C",
        studentEmail: "20190003@student.hcmute.edu.vn"
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
  }
};

export const ScheduleManager = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
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
              {t("common.accessDenied")}
            </h2>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {t("admin.adminOnly")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const addSchedule = () => {
    if (!date || !name || !email) {
      setNotif(t("admin.fillAllFields"));
      return;
    }
    const item: ScheduleItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      date,
      shift,
      studentName: name,
      studentEmail: email,
      confirmed: false
    };
    setSchedules((s) => [item, ...s]);
    setNotif(t("admin.scheduleAdded"));
    setName("");
    setEmail("");
  };

  const removeSchedule = (id: string) => {
    setSchedules((s) => s.filter((it) => it.id !== id));
    setNotif(t("admin.scheduleDeleted"));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <CalendarCheck className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t("admin.schedulesHeader")}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {t("admin.manageDesc")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Add Schedule Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-100 p-5 dark:border-gray-700">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <Plus className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                {t("admin.addSchedule")}
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {t("admin.date")}
                  </label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-500 dark:focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {t("admin.shift")}
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-500 dark:focus:ring-blue-900"
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
                    {t("admin.name")}
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-500 dark:focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {t("admin.email")}
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mssv@student.hcmute.edu.vn"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-500 dark:focus:ring-blue-900"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={addSchedule}
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    {t("admin.add")}
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
                    {t("admin.cancel")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule List */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-gray-700">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <Calendar className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                {t("admin.scheduleList")}
              </h3>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {t("admin.scheduleCount", { count: schedules.length })}
              </span>
            </div>

            <div className="max-h-[500px] overflow-y-auto p-4">
              {schedules.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t("admin.noSchedules")}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t("admin.addFirstSchedule")}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {schedules.map((it) => (
                    <div
                      key={it.id}
                      className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/50 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:border-blue-800"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-600 font-bold text-white">
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
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            // admin can toggle confirmation for any schedule
                            if (!user || user.role !== "admin") return;
                            setSchedules((s) =>
                              s.map((x) =>
                                x.id === it.id
                                  ? {
                                      ...x,
                                      confirmed: !x.confirmed,
                                      confirmedBy: !x.confirmed
                                        ? user.email
                                        : undefined,
                                      confirmedAt: !x.confirmed
                                        ? new Date().toISOString()
                                        : undefined
                                    }
                                  : x
                              )
                            );
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                          title={it.confirmed ? "Bỏ xác nhận" : "Xác nhận"}
                        >
                          <Check className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() => removeSchedule(it.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
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
