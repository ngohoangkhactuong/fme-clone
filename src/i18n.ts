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
        today: "Today",
        themeToggle: "Toggle theme",
        logout: "Logout",
        addImage: "Add image",
        dragDropOrSelect:
          "Supports drag & drop or select multiple images (jpg, png)",
        noImages: "No images attached",
        viewImage: "View image",
        deleteImage: "Delete image"
      },
      menu: {
        home: "Home",
        introduction: "Introduction",
        education: "Education",
        research: "Research",
        accreditation: "Accreditation",
        forms: "Forms",
        unions: "Unions",
        committees: "Committees"
      },
      header: {
        departmentName: "MECHANICAL ENGINEERING",
        universityName:
          "Ho Chi Minh City University of Technology and Education"
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
        reportDeleted: "Report deleted.",
        addSchedule: "Add new schedule",
        scheduleAdded: "Schedule added.",
        scheduleDeleted: "Schedule deleted.",
        fillAllFields: "Please fill all fields.",
        scheduleList: "Schedule list",
        scheduleCount: "{{count}} schedules",
        noSchedules: "No schedules yet",
        addFirstSchedule: "Add your first schedule",
        name: "Full name",
        email: "Student email",
        shift: "Shift",
        add: "Add",
        cancel: "Cancel",
        manageDesc: "Create and manage duty schedules for students",
        adminOnly: "Only administrators can access schedule management.",
        confirmedBy: "Confirmed by",
        morning: "Morning (7:30 - 11:30)",
        afternoon: "Afternoon (13:30 - 17:30)",
        evening: "Evening (17:30 - 21:30)"
      },
      auth: {
        signInTitle: "Sign in to your account",
        emailLabel: "Email",
        emailPlaceholder: "23146053@student.hcmute.edu.vn",
        passwordLabel: "Password",
        passwordPlaceholder: "••••••••",
        forgotPassword: "Forgot password?",
        noAccount: "Don't have an account? ",
        signUpLink: "Sign up",
        defaultPassword: "Default password: password123",
        invalidEmail: "Email must be in format mssv@student.hcmute.edu.vn",
        loginFailed: "Login failed. Check your credentials.",
        orContinueWith: "Or continue with",
        signInWithGoogle: "Sign in with Google",
        signUpWithGoogle: "Sign up with Google",
        googleSignInFailed:
          "Google sign-in failed. Please use your HCMUTE student email (mssv@student.hcmute.edu.vn).",
        googleSignUpFailed:
          "Google sign-up failed. Please use your HCMUTE student email (mssv@student.hcmute.edu.vn).",
        signUpTitle: "Create account",
        signUpSubtitle: "Register to access full features",
        fullName: "Full name",
        namePlaceholder: "Nguyen Van A",
        studentEmail: "Student email",
        useHcmuteEmail: "Use HCMUTE student email",
        passwordMinLength: "At least 8 characters",
        passwordHelp: "Password must be at least 8 characters",
        passwordTooShort: "Password must be at least 8 characters",
        alreadyHaveAccount: "Already have an account? ",
        signInLink: "Sign in",
        emailExists: "Email already exists or is invalid"
      },
      profile: {
        recentActivity: "Recent activity",
        noReports: "No recent reports",
        noReportsDesc: "You haven't submitted any duty reports yet.",
        role: "Role",
        admin: "Administrator",
        student: "Student",
        editProfile: "Edit",
        noTitle: "No title"
      },
      accountSettings: {
        title: "Account settings",
        description: "Manage your account information and security",
        avatar: "Avatar",
        selectImage: "Select image",
        saveImage: "Save image",
        personalInfo: "Personal information",
        fullName: "Full name",
        saveChanges: "Save changes",
        security: "Security",
        changePassword: "Change password",
        currentPassword: "Current password",
        newPassword: "New password",
        confirmPassword: "Confirm new password",
        updatePassword: "Update password",
        needLogin: "You need to log in to change information.",
        noAvatarToSave: "No avatar to save",
        avatarUpdated: "Avatar has been updated",
        avatarUpdateFailed: "Failed to update avatar",
        avatarDeleted: "Avatar has been deleted",
        avatarDeleteFailed: "Failed to delete avatar"
      },
      footer: {
        departmentName: "Mechanical Engineering Department",
        universityName: "HCMUTE",
        quickLinks: "Quick links",
        contact: "Contact",
        copyright:
          "© 2025 Mechanical Engineering Department – Ho Chi Minh City University of Technology and Education",
        privacyPolicy: "Privacy policy",
        termsOfService: "Terms of service",
        introduction: "Introduction",
        training: "Training",
        research: "Research",
        admission: "Admission",
        contactUs: "Contact"
      },
      home: {
        undergraduatePrograms: "Undergraduate Programs",
        postgraduatePrograms: "Postgraduate Programs",
        viewDetails: "View details →",
        currentTime: "Current time",
        academicYearMotto:
          "Academic Year 2025–2026 Theme: Innovation – Integration – Development",
        newsAndEvents: "News & Events",
        latestUpdates: "Latest updates",
        viewAll: "View all",
        readMore: "Read more",
        hot: "Hot"
      },
      programs: {
        mechatronics: "Mechatronics Engineering Technology",
        mechanicalEngineering: "Mechanical Engineering Technology",
        manufacturing: "Manufacturing Technology",
        industrialEngineering: "Industrial Engineering",
        woodAndFurniture: "Wood & Furniture Technology",
        roboticsAI: "Robotics & Artificial Intelligence",
        masters: "Master's Degree",
        doctorate: "Doctoral Degree"
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
        today: "Hôm nay",
        themeToggle: "Đổi giao diện",
        logout: "Đăng xuất",
        addImage: "Thêm ảnh",
        dragDropOrSelect: "Hỗ trợ kéo thả hoặc chọn nhiều ảnh (jpg, png)",
        noImages: "Chưa có ảnh đính kèm",
        viewImage: "Xem ảnh",
        deleteImage: "Xóa ảnh"
      },
      menu: {
        home: "Home",
        introduction: "Giới thiệu",
        education: "Đào tạo",
        research: "NCKH",
        accreditation: "Kiểm định",
        forms: "Biểu mẫu",
        unions: "Đoàn thể",
        committees: "Đoàn - Hội"
      },
      header: {
        departmentName: "KHOA CƠ KHÍ CHẾ TẠO MÁY",
        universityName: "Trường ĐH Sư phạm Kỹ thuật TP.HCM"
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
        reportDeleted: "Đã xóa báo cáo.",
        addSchedule: "Thêm lịch mới",
        scheduleAdded: "Đã thêm lịch trực.",
        scheduleDeleted: "Đã xóa lịch trực.",
        fillAllFields: "Vui lòng điền đủ thông tin.",
        scheduleList: "Danh sách lịch trực",
        scheduleCount: "{{count}} lịch",
        noSchedules: "Chưa có lịch trực nào",
        addFirstSchedule: "Hãy thêm lịch trực đầu tiên",
        name: "Họ và tên",
        email: "Email sinh viên",
        shift: "Ca trực",
        add: "Thêm lịch",
        cancel: "Hủy",
        manageDesc: "Tạo và quản lý lịch trực cho sinh viên",
        adminOnly:
          "Chỉ quản trị viên mới có thể truy cập trang quản lý lịch trực.",
        confirmedBy: "Xác nhận bởi",
        morning: "Sáng (7:30 - 11:30)",
        afternoon: "Chiều (13:30 - 17:30)",
        evening: "Tối (17:30 - 21:30)"
      },
      auth: {
        signInTitle: "Đăng nhập vào tài khoản",
        emailLabel: "Email",
        emailPlaceholder: "23146053@student.hcmute.edu.vn",
        passwordLabel: "Mật khẩu",
        passwordPlaceholder: "••••••••",
        forgotPassword: "Quên mật khẩu?",
        noAccount: "Chưa có tài khoản? ",
        signUpLink: "Đăng ký",
        defaultPassword: "Mật khẩu mặc định: password123",
        invalidEmail: "Email phải có định dạng mssv@student.hcmute.edu.vn",
        loginFailed: "Đăng nhập thất bại. Kiểm tra lại thông tin.",
        orContinueWith: "Hoặc tiếp tục với",
        signInWithGoogle: "Đăng nhập bằng Google",
        signUpWithGoogle: "Đăng ký bằng Google",
        googleSignInFailed:
          "Đăng nhập Google thất bại. Vui lòng sử dụng email sinh viên HCMUTE (mssv@student.hcmute.edu.vn).",
        googleSignUpFailed:
          "Đăng ký Google thất bại. Vui lòng sử dụng email sinh viên HCMUTE (mssv@student.hcmute.edu.vn).",
        signUpTitle: "Tạo tài khoản",
        signUpSubtitle: "Đăng ký để truy cập đầy đủ tính năng",
        fullName: "Họ và tên",
        namePlaceholder: "Nguyễn Văn A",
        studentEmail: "Email sinh viên",
        useHcmuteEmail: "Sử dụng email sinh viên HCMUTE",
        passwordMinLength: "Ít nhất 8 ký tự",
        passwordHelp: "Mật khẩu cần có ít nhất 8 ký tự",
        passwordTooShort: "Mật khẩu phải có ít nhất 8 ký tự",
        alreadyHaveAccount: "Đã có tài khoản? ",
        signInLink: "Đăng nhập",
        emailExists: "Email đã tồn tại hoặc không hợp lệ"
      },
      profile: {
        recentActivity: "Hoạt động gần đây",
        noReports: "Chưa có báo cáo nào",
        noReportsDesc: "Bạn chưa gửi báo cáo ca trực nào.",
        role: "Vai trò",
        admin: "Quản trị viên",
        student: "Sinh viên",
        editProfile: "Chỉnh sửa",
        noTitle: "Không có tiêu đề"
      },
      accountSettings: {
        title: "Cài đặt tài khoản",
        description: "Quản lý thông tin và bảo mật tài khoản của bạn",
        avatar: "Ảnh đại diện",
        selectImage: "Chọn ảnh",
        saveImage: "Lưu ảnh",
        personalInfo: "Thông tin cá nhân",
        fullName: "Họ và tên",
        saveChanges: "Lưu thay đổi",
        security: "Bảo mật",
        changePassword: "Thay đổi mật khẩu",
        currentPassword: "Mật khẩu hiện tại",
        newPassword: "Mật khẩu mới",
        confirmPassword: "Xác nhận mật khẩu mới",
        updatePassword: "Cập nhật mật khẩu",
        needLogin: "Bạn cần đăng nhập để thay đổi thông tin.",
        noAvatarToSave: "Chưa có avatar để lưu",
        avatarUpdated: "Avatar đã được cập nhật",
        avatarUpdateFailed: "Cập nhật avatar thất bại",
        avatarDeleted: "Avatar đã bị xóa",
        avatarDeleteFailed: "Xóa avatar thất bại"
      },
      footer: {
        departmentName: "Khoa Cơ Khí Chế Tạo Máy",
        universityName: "ĐH Sư phạm Kỹ thuật TP.HCM",
        quickLinks: "Liên kết nhanh",
        contact: "Liên hệ",
        copyright:
          "© 2025 Khoa Cơ Khí Chế Tạo Máy – Trường ĐH Sư phạm Kỹ thuật TP.HCM",
        privacyPolicy: "Chính sách bảo mật",
        termsOfService: "Điều khoản sử dụng",
        introduction: "Giới thiệu",
        training: "Đào tạo",
        research: "Nghiên cứu",
        admission: "Tuyển sinh",
        contactUs: "Liên hệ"
      },
      home: {
        undergraduatePrograms: "Ngành đào tạo",
        postgraduatePrograms: "Đào tạo sau đại học",
        viewDetails: "Xem chi tiết →",
        currentTime: "Thời gian hiện tại",
        academicYearMotto:
          "Chủ đề năm học 2025–2026: Sáng tạo – Hội nhập – Phát triển",
        newsAndEvents: "Tin tức & Sự kiện",
        latestUpdates: "Cập nhật những thông tin mới nhất",
        viewAll: "Xem tất cả",
        readMore: "Đọc thêm",
        hot: "Hot"
      },
      programs: {
        mechatronics: "Công nghệ Kỹ thuật Cơ điện tử",
        mechanicalEngineering: "Công nghệ Kỹ thuật Cơ khí",
        manufacturing: "Công nghệ Chế tạo máy",
        industrialEngineering: "Kỹ thuật Công nghiệp",
        woodAndFurniture: "Kỹ nghệ gỗ & Nội thất",
        roboticsAI: "Robot & Trí tuệ nhân tạo",
        masters: "Thạc sĩ",
        doctorate: "Tiến sĩ"
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
