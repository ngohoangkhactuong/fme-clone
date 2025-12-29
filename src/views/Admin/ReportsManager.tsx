import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { STORAGE_KEYS } from "@/constants";
import { Download, Trash2 } from "lucide-react";
import { Notification } from "@/components/layout/Notification";
import { useTranslation } from "react-i18next";

type ReportItem = {
  id?: string;
  scheduleId?: string;
  title?: string;
  date?: string;
  submittedBy?: string;
  submittedAt?: string;
  status?: string;
};

const toCSV = (rows: ReportItem[]) => {
  const header = [
    "id",
    "scheduleId",
    "title",
    "date",
    "submittedBy",
    "submittedAt",
    "status"
  ];
  const esc = (v: unknown) => {
    if (v === undefined || v === null) return "";
    const s = String(v);
    if (s.includes(",") || s.includes("\n") || s.includes('"'))
      return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [header.join(",")];
  rows.forEach((r) => {
    lines.push(
      [
        r.id,
        r.scheduleId,
        r.title,
        r.date,
        r.submittedBy,
        r.submittedAt,
        r.status
      ]
        .map(esc)
        .join(",")
    );
  });
  return lines.join("\n");
};

const ReportsManager: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [filterBy, setFilterBy] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [notif, setNotif] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.REPORTS) || "[]";
      setReports(JSON.parse(raw) as ReportItem[]);
    } catch {
      setReports([]);
    }
  }, []);

  const persist = (next: ReportItem[]) => {
    setReports(next);
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const filtered = useMemo(
    () =>
      reports.filter((r) => {
        if (
          filterBy &&
          !(r.submittedBy || "").toLowerCase().includes(filterBy.toLowerCase())
        )
          return false;
        if (
          fromDate &&
          r.submittedAt &&
          new Date(r.submittedAt) < new Date(fromDate)
        )
          return false;
        if (
          toDate &&
          r.submittedAt &&
          new Date(r.submittedAt) > new Date(toDate + "T23:59:59")
        )
          return false;
        return true;
      }),
    [reports, filterBy, fromDate, toDate]
  );

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "duty-reports.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const csv = toCSV(filtered);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "duty-reports.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const removeReport = (id?: string) => {
    if (!id) return;
    const next = reports.filter((r) => r.id !== id);
    persist(next);
    setNotif(t("admin.reportDeleted"));
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <p>{t("common.accessDenied")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("admin.reportsHeader")}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadJSON}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm"
          >
            <Download /> {t("admin.downloadJSON")}
          </button>
          <button
            onClick={downloadCSV}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm"
          >
            <Download /> {t("admin.downloadCSV")}
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          placeholder={t("admin.filterByEmail") || undefined}
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="rounded-lg border px-3 py-2"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="rounded-lg border px-3 py-2"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="rounded-lg border px-3 py-2"
        />
      </div>

      <div className="rounded-2xl border bg-white p-4">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-500">
            {t("admin.noReports")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-600">
                  <th className="px-3 py-2">{t("duty.titleLabel")}</th>
                  <th className="px-3 py-2">{t("admin.date")}</th>
                  <th className="px-3 py-2">{t("admin.sender")}</th>
                  <th className="px-3 py-2">{t("admin.sentAt")}</th>
                  <th className="px-3 py-2">Schedule</th>
                  <th className="px-3 py-2">{t("admin.status")}</th>
                  <th className="px-3 py-2">{t("admin.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="max-w-xs truncate px-3 py-2">{r.title}</td>
                    <td className="px-3 py-2">{r.date}</td>
                    <td className="px-3 py-2">{r.submittedBy}</td>
                    <td className="px-3 py-2">
                      {r.submittedAt
                        ? new Date(r.submittedAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-3 py-2">{r.scheduleId || "-"}</td>
                    <td className="px-3 py-2">{r.status}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => removeReport(r.id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1 text-xs text-red-600"
                      >
                        <Trash2 /> {t("admin.delete")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {notif && <Notification message={notif} onClose={() => setNotif(null)} />}
    </div>
  );
};

export default ReportsManager;
