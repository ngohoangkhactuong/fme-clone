import { Calendar, Clock, Send, User } from "lucide-react";
import { useState } from "react";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { registeredStudentEmails } from "@/dataSources/registeredStudents";

const DUTY_SHIFTS = [
  "Sáng (7:30 - 11:30)",
  "Chiều (13:30 - 17:30)",
  "Tối (17:30 - 21:30)"
];

const INITIAL_STATE = {
  dutyDate: "",
  dutyShift: DUTY_SHIFTS[0],
  name: "",
  studentId: ""
};

type FormState = typeof INITIAL_STATE;

type DutyRegistrationFormProps = {
  onSuccess: () => void;
};

const FormField = ({
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange
}: {
  icon: typeof User;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="relative">
    <Icon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <input
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
      className="w-full rounded-lg border border-gray-200 p-3 pl-10 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500/50"
    />
  </div>
);

const DutyShiftSelect = ({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="relative">
    <Clock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <select
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className="w-full appearance-none rounded-lg border border-gray-200 bg-white p-3 pl-10 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500/50"
    >
      {DUTY_SHIFTS.map((shift) => (
        <option key={shift} value={shift}>
          {shift}
        </option>
      ))}
    </select>
  </div>
);

export const DutyRegistrationForm = ({
  onSuccess
}: DutyRegistrationFormProps) => {
  const { user } = useAuth();
  const allowed =
    !!user &&
    (user.role === "admin" ||
      user.studentId === "23146053" ||
      registeredStudentEmails.includes(user.email));

  const [form, setForm] = useState<FormState>(() => ({
    ...INITIAL_STATE,
    name: user?.name ?? ""
  }));

  const handleChange = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.studentId || !form.dutyDate) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Attach submit metadata so admin can see who submitted
    const payload = {
      ...form,
      submittedBy: user?.email ?? "anonymous",
      submittedAt: new Date().toISOString()
    };

    // In a real app we'd POST payload to the server here.
    // For now keep a console log and call onSuccess to show UI feedback.
    // eslint-disable-next-line no-console
    console.log("Duty registration submitted:", payload);

    onSuccess();
    setForm({ ...INITIAL_STATE, name: user?.name ?? "" });
  };

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-8">
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
              Bạn cần đăng nhập để đăng ký ca trực.
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
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-8">
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
              Tài khoản của bạn chưa được cấp quyền đăng ký ca trực.
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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Họ và tên <span className="text-red-500">*</span>
        </label>
        <FormField
          icon={User}
          onChange={(value) => handleChange("name", value)}
          placeholder="Họ và tên"
          value={form.name}
        />
      </div>

      <div>
        <label
          htmlFor="studentId"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Mã số sinh viên <span className="text-red-500">*</span>
        </label>
        <FormField
          icon={User}
          onChange={(value) => handleChange("studentId", value)}
          placeholder="Mã số sinh viên (MSSV)"
          value={form.studentId}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="dutyDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Ngày ca trực <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-2">
            <Calendar className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="dutyDate"
              onChange={(e) => handleChange("dutyDate", e.target.value)}
              type="date"
              value={form.dutyDate}
              className="w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:ring-blue-900"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="dutyShift"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Ca trực <span className="text-red-500">*</span>
          </label>
          <DutyShiftSelect
            onChange={(value) => handleChange("dutyShift", value)}
            value={form.dutyShift}
          />
        </div>
      </div>

      <button
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        type="submit"
      >
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        Đăng ký ngay
      </button>
    </form>
  );
};
