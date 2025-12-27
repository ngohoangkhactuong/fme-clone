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
      <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center">
        <p className="mb-4">Bạn cần đăng nhập để đăng ký ca trực.</p>
        <div className="flex justify-center gap-3">
          <a href="/auth/signin" className="text-blue-600 underline">
            Đăng nhập
          </a>
          <a href="/auth/signup" className="text-green-600 underline">
            Đăng ký
          </a>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center">
        <p className="mb-4">
          Tài khoản của bạn chưa được cấp quyền đăng ký ca trực.
        </p>
        <p className="text-sm text-gray-500">
          Liên hệ admin để được phê duyệt.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FormField
        icon={User}
        onChange={(value) => handleChange("name", value)}
        placeholder="Họ và tên"
        value={form.name}
      />

      <FormField
        icon={User}
        onChange={(value) => handleChange("studentId", value)}
        placeholder="Mã số sinh viên"
        value={form.studentId}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Calendar className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            onChange={(e) => handleChange("dutyDate", e.target.value)}
            type="date"
            value={form.dutyDate}
            className="w-full rounded-lg border border-gray-200 p-3 pl-10 text-sm text-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:focus:ring-blue-500/50"
          />
        </div>

        <DutyShiftSelect
          onChange={(value) => handleChange("dutyShift", value)}
          value={form.dutyShift}
        />
      </div>

      <button
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
        type="submit"
      >
        <Send className="h-5 w-5 transition-transform group-hover:rotate-45" />
        Đăng ký ngay
      </button>
    </form>
  );
};
