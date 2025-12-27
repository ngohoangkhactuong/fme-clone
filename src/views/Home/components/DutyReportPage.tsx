import { useEffect, useState } from "react";
import { Notification } from "@/components/layout/Notification";
import { ReportSection } from "./ReportSection";
import { ImageUploader } from "@/components/common/ImageUploader";

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
  const [report, setReport] = useState<DutyReport>(initialReport);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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
      alert("Vui lòng nhập tiêu đề và chọn ngày ca trực trước khi gửi.");
      return;
    }

    setSubmitting(true);
    try {
      // Simulate submit; in real app replace with API call.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const submitted = { ...report, status: "submitted" as ReportStatus };
      setReport(submitted);
      localStorage.removeItem(DRAFT_KEY);
      setShowNotification(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6 rounded-2xl bg-white p-6 shadow-xl shadow-blue-500/10 dark:bg-gray-800 dark:shadow-black/20">
        <header className="mb-2">
          <h1 className="text-2xl font-bold">Báo cáo ca trực</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Tạo báo cáo sau hoặc trong ca trực — mô tả công việc, sự cố và lưu
            trữ ảnh.
          </p>
        </header>

        <ReportSection title="Tổng quan">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tiêu đề
              </label>
              <input
                value={report.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Tiêu đề báo cáo"
                className="w-full rounded-md border border-gray-200 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Trạng thái
              </label>
              <select
                value={report.status}
                onChange={(e) =>
                  update("status", e.target.value as ReportStatus)
                }
                className="w-full rounded-md border border-gray-200 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="draft">Nháp</option>
                <option value="submitted">Đã gửi</option>
              </select>
            </div>
          </div>
        </ReportSection>

        <ReportSection title="Chi tiết">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tóm tắt
              </label>
              <textarea
                rows={3}
                value={report.summary}
                onChange={(e) => update("summary", e.target.value)}
                placeholder="Tóm tắt nhanh về ca trực"
                className="w-full rounded-md border border-gray-200 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Công việc đã thực hiện
              </label>
              <textarea
                rows={4}
                value={report.tasks}
                onChange={(e) => update("tasks", e.target.value)}
                placeholder="Liệt kê nhiệm vụ và hành động cụ thể"
                className="w-full rounded-md border border-gray-200 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sự cố / Ghi chú
              </label>
              <textarea
                rows={3}
                value={report.incidents}
                onChange={(e) => update("incidents", e.target.value)}
                placeholder="Mô tả sự cố (nếu có)"
                className="w-full rounded-md border border-gray-200 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </ReportSection>

        <ReportSection title="Thời gian">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Ngày ca
              </label>
              <input
                value={report.date}
                onChange={(e) => update("date", e.target.value)}
                type="date"
                className="w-full rounded-md border border-gray-200 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Bắt đầu
              </label>
              <input
                value={report.startTime}
                onChange={(e) => update("startTime", e.target.value)}
                type="time"
                className="w-full rounded-md border border-gray-200 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Kết thúc
              </label>
              <input
                value={report.endTime}
                onChange={(e) => update("endTime", e.target.value)}
                type="time"
                className="w-full rounded-md border border-gray-200 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </ReportSection>

        <ReportSection title="Ảnh đính kèm">
          <ImageUploader images={report.images} onChange={handleImagesChange} />
        </ReportSection>

        <ReportSection title="Ghi chú bổ sung">
          <textarea
            rows={3}
            value={report.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Các ghi chú phụ trợ"
            className="w-full rounded-md border border-gray-200 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </ReportSection>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="rounded-md border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {saving ? "Đang lưu..." : "Lưu nháp"}
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Đang gửi..." : "Gửi báo cáo"}
          </button>
        </div>
      </div>

      {showNotification && (
        <Notification
          message={
            report.status === "submitted"
              ? "Báo cáo đã được gửi."
              : "Nháp đã được lưu."
          }
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default DutyReportPage;
