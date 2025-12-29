import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const STORAGE_KEY = "app:lang";

const resources = {
  en: {
    translation: {
      common: {
        signIn: "Sign in",
        signUp: "Sign up",
        profile: "Profile",
        settings: "Settings",
        report: "Duty Report",
        calendar: "Calendar",
        adminSchedules: "Manage Schedules",
        adminReports: "Manage Reports",
        saveDraft: "Save draft",
        submitting: "Submitting...",
        submitReport: "Submit report",
        loginRequired: "Login required",
        accessDenied: "Access denied",
        today: "Today"
      },
      duty: {
        title: "Duty Report",
        overview: "Overview",
        titleLabel: "Title",
        dateLabel: "Date",
        time: "Shift time",
        start: "Start",
        end: "End",
        details: "Duty details",
        summary: "Summary",
        tasks: "Tasks performed",
        incidents: "Incidents / Notes",
        attachments: "Attachments",
        extraNotes: "Additional notes",
        draftSaved: "Draft saved.",
        reportSent: "Report submitted successfully.",
        needTitleAndDate: "Please provide a title and date before submitting.",
        needLogin: "You must be logged in to submit.",
        needPermission:
          "Your account does not have permission to submit reports."
      },
      schedules: {
        header: "Schedules",
        confirm: "Confirm",
        confirmed: "Confirmed",
        writeReport: "Write report",
        noEvents: "No shifts on this day",
        assignedCount: "{{count}} scheduled shifts"
      },
      admin: {
        schedulesHeader: "Manage Schedules",
        reportsHeader: "Manage Duty Reports",
        filterByEmail: "Filter by sender email",
        fromDate: "From date",
        toDate: "To date",
        downloadJSON: "JSON",
        downloadCSV: "CSV",
        actions: "Actions",
        delete: "Delete",
        noReports: "No reports",
        date: "Date",
        sender: "Sender",
        sentAt: "Submitted at",
        status: "Status",
        reportDeleted: "Report deleted."
      }
    }
  },
  vi: {
    translation: {
      common: {
        signIn: "Đăng nhập",
        signUp: "Đăng ký",
        profile: "Profile",
        settings: "Chỉnh sửa",
        report: "Báo cáo ca trực",
        calendar: "Lịch trực",
        adminSchedules: "Quản lý lịch trực",
        adminReports: "Quản lý báo cáo",
        saveDraft: "💾 Lưu nháp",
        submitting: "Đang gửi...",
        submitReport: "✓ Gửi báo cáo",
        loginRequired: "Đăng nhập yêu cầu",
        accessDenied: "Quyền truy cập bị từ chối",
        today: "Hôm nay"
      },
      duty: {
        title: "Báo cáo ca trực",
        overview: "Tổng quan",
        titleLabel: "Tiêu đề",
        dateLabel: "Ngày ca",
        time: "Thời gian ca trực",
        start: "Bắt đầu",
        end: "Kết thúc",
        details: "Chi tiết ca trực",
        summary: "Tóm tắt",
        tasks: "Công việc đã thực hiện",
        incidents: "Sự cố / Ghi chú",
        attachments: "Ảnh đính kèm",
        extraNotes: "Ghi chú bổ sung",
        draftSaved: "✓ Nháp đã được lưu.",
        reportSent: "✓ Báo cáo đã được gửi thành công.",
        needTitleAndDate:
          "Vui lòng nhập tiêu đề và chọn ngày ca trực trước khi gửi.",
        needLogin: "Bạn cần đăng nhập để gửi báo cáo.",
        needPermission: "Tài khoản của bạn chưa được cấp quyền gửi báo cáo."
      },
      schedules: {
        header: "Lịch trực",
        confirm: "Xác nhận",
        confirmed: "Đã xác nhận",
        writeReport: "Viết báo cáo",
        noEvents: "Không có ca trực nào trong ngày này",
        assignedCount: "{{count}} ca trực được xếp lịch"
      },
      admin: {
        schedulesHeader: "Quản lý lịch trực",
        reportsHeader: "Quản lý báo cáo ca trực",
        filterByEmail: "Lọc theo email người gửi",
        fromDate: "Từ ngày",
        toDate: "Đến ngày",
        downloadJSON: "JSON",
        downloadCSV: "CSV",
        actions: "Hành động",
        delete: "Xóa",
        noReports: "Không có báo cáo",
        date: "Ngày",
        sender: "Người gửi",
        sentAt: "Thời gian gửi",
        status: "Trạng thái",
        reportDeleted: "Đã xóa báo cáo."
      }
    }
  }
};

export const setupI18n = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "vi",
      interpolation: {
        escapeValue: false
      },
      detection: {
        // persist selection in localStorage
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: STORAGE_KEY
      }
    });

  // expose helper to change language and persist
  const setLanguage = (lng: "vi" | "en") => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem(STORAGE_KEY, lng);
    } catch {
      // ignore
    }
  };

  return { i18n, setLanguage };
};

export default i18n;
