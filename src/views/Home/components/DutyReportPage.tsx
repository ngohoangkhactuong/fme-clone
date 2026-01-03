import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Notification } from "@/components/layout/Notification";
import { useTranslation } from "react-i18next";
import { ImageUploader } from "@/components/common/ImageUploader";
import { useAuth } from "@/hooks/useAuth";
import { STORAGE_KEYS } from "@/constants";

type ReportStatus = "draft" | "submitted";

type DutyReport = {
  title: string;
  summary: string;
  tasks: string;
  incidents: string;
  notes: string;
  date: string;
  startTime: string;
  endTime: string;
  images: string[]; // object URLs for preview / persisted data
  status: ReportStatus;
};

const DRAFT_KEY = "dutyReportDraft:v1";

const initialReport: DutyReport = {
  title: "",
  summary: "",
  tasks: "",
  incidents: "",
  notes: "",
  date: "",
  startTime: "",
  endTime: "",
  images: [],
  status: "draft"
};

export const DutyReportPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [linkedScheduleId, setLinkedScheduleId] = useState<string | null>(null);
  const allowed =
    !!user &&
    (user.role === "admin" ||
      user.studentId === "23146053" ||
      user.canAccessReports === true);
  const [report, setReport] = useState<DutyReport>(initialReport);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // If opened from a schedule, prefill date and title
    const scheduleId = searchParams.get("scheduleId");
    const dateParam = searchParams.get("date");
    if (scheduleId) {
      setLinkedScheduleId(scheduleId);
      try {
        type MaybeSchedule = {
          id?: string;
          date?: string;
          shift?: string;
          studentName?: string;
        };
        const raw = localStorage.getItem("duty:schedules:v1") || "[]";
        const list = JSON.parse(raw) as MaybeSchedule[];
        const found = list.find((s) => s.id === scheduleId);
        if (found) {
          setReport((prev) => ({
            ...prev,
            date: dateParam || found.date || prev.date,
            title:
              prev.title ||
              `Báo cáo ca trực - ${found.shift} - ${found.studentName}`
          }));
        } else if (dateParam) {
          setReport((prev) => ({ ...prev, date: dateParam }));
        }
      } catch {
        // ignore
      }
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DutyReport;
        setReport((prev) => ({ ...prev, ...parsed }));
      }
    } catch (err) {
      // ignore parse errors
      void err;
    }
  }, []);

  useEffect(() => {
    // autosave draft every 3s when status is draft
    if (report.status !== "draft") {
      return () => {};
    }
    const id = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(report));
    }, 3000);
    return () => clearTimeout(id);
  }, [report]);

  const update = <K extends keyof DutyReport>(key: K, value: DutyReport[K]) => {
    setReport((prev) => ({ ...prev, [key]: value }));
  };

  const handleImagesChange = (images: string[]) => update("images", images);

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(report));
    } finally {
      setSaving(false);
      setShowNotification(true);
    }
  };

  const handleSubmit = async () => {
    if (!report.title || !report.date) {
      alert(t("duty.needTitleAndDate"));
      return;
    }

    if (!user) {
      alert(t("duty.needLogin"));
      return;
    }

    if (!allowed) {
      alert(t("duty.needPermission"));
      return;
    }

    setSubmitting(true);
    try {
      // Simulate submit; in real app replace with API call.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const submitted = {
        ...report,
        status: "submitted" as ReportStatus,
        // attach who submitted

        submittedBy: user.email,
        submittedAt: new Date().toISOString(),
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        scheduleId: linkedScheduleId || undefined
      } as DutyReport & {
        submittedBy?: string;
        submittedAt?: string;
        id?: string;
      };

      // persist submitted reports list in localStorage
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.REPORTS) || "[]";
        const list = JSON.parse(raw) as Array<Record<string, unknown>>;
        list.push(submitted);
        localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(list));
      } catch (err) {
        // ignore storage errors
        void err;
      }

      setReport(submitted);
      localStorage.removeItem(DRAFT_KEY);
      setShowNotification(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Đăng nhập yêu cầu
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Bạn cần đăng nhập để xem và gửi báo cáo ca trực.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <a
              href="/auth/signin"
              className="block rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-center font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800"
            >
              Đăng nhập
            </a>
            <a
              href="/auth/signup"
              className="block rounded-lg border-2 border-blue-600 px-4 py-2.5 text-center font-semibold text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              Tạo tài khoản mới
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
                <svg
                  className="h-6 w-6 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Quyền truy cập bị từ chối
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Tài khoản của bạn chưa được cấp quyền xem/gửi báo cáo ca trực.
            </p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              Liên hệ admin để được phê duyệt trước khi sử dụng tính năng này.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t("duty.title")}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Tạo báo cáo sau hoặc trong ca trực — mô tả công việc, sự cố và lưu trữ
          ảnh.
        </p>
      </div>

      <form className="space-y-6">
        {/* Tổng quan Section */}
        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("duty.overview")}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("duty.titleLabel")} <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                value={report.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Tiêu đề báo cáo"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("duty.dateLabel")} <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                value={report.date}
                onChange={(e) => update("date", e.target.value)}
                type="date"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
              />
            </div>
          </div>
        </div>

        {/* Thời gian Section */}
        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("duty.time")}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("duty.start")}
              </label>
              <input
                id="startTime"
                value={report.startTime}
                onChange={(e) => update("startTime", e.target.value)}
                type="time"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
              />
            </div>
            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("duty.end")}
              </label>
              <input
                id="endTime"
                value={report.endTime}
                onChange={(e) => update("endTime", e.target.value)}
                type="time"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
              />
            </div>
          </div>
        </div>

        {/* Chi tiết Section */}
        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("duty.details")}
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("duty.summary")}
              </label>
              <textarea
                id="summary"
                rows={3}
                value={report.summary}
                onChange={(e) => update("summary", e.target.value)}
                placeholder="Tóm tắt nhanh về ca trực"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
              />
            </div>

            <div>
              <label
                htmlFor="tasks"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("duty.tasks")}
              </label>
              <textarea
                id="tasks"
                rows={4}
                value={report.tasks}
                onChange={(e) => update("tasks", e.target.value)}
                placeholder="Liệt kê nhiệm vụ và hành động cụ thể"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
              />
            </div>

            <div>
              <label
                htmlFor="incidents"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("duty.incidents")}
              </label>
              <textarea
                id="incidents"
                rows={3}
                value={report.incidents}
                onChange={(e) => update("incidents", e.target.value)}
                placeholder="Mô tả sự cố (nếu có)"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
              />
            </div>
          </div>
        </div>

        {/* Ảnh đính kèm Section */}
        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("duty.attachments")}
          </h2>
          <ImageUploader images={report.images} onChange={handleImagesChange} />
        </div>

        {/* Ghi chú bổ sung Section */}
        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("duty.extraNotes")}
          </h2>
          <textarea
            rows={3}
            value={report.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Các ghi chú phụ trợ"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            type="button"
            className="rounded-lg border-2 border-gray-300 px-6 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {saving ? t("common.submitting") : t("common.saveDraft")}
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            type="button"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
          >
            {submitting ? t("common.submitting") : t("common.submitReport")}
          </button>
        </div>
      </form>

      {showNotification && (
        <Notification
          message={
            report.status === "submitted"
              ? t("duty.reportSent")
              : t("duty.draftSaved")
          }
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default DutyReportPage;
