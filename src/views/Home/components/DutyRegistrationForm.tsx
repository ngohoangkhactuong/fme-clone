import React, { useState } from "react";
import { User, Calendar, Clock, Send } from "lucide-react";

type DutyRegistrationFormProps = {
  onSuccess: () => void;
};

export const DutyRegistrationForm: React.FC<DutyRegistrationFormProps> = ({
  onSuccess
}) => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [dutyDate, setDutyDate] = useState("");
  const [dutyShift, setDutyShift] = useState("Sáng");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !studentId || !dutyDate) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    onSuccess();

    setName("");
    setStudentId("");
    setDutyDate("");
    setDutyShift("Sáng");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-gray-200 p-3 pl-10 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="relative">
        <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Mã số sinh viên"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full rounded-lg border border-gray-200 p-3 pl-10 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Calendar className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            value={dutyDate}
            onChange={(e) => setDutyDate(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3 pl-10 text-sm text-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="relative">
          <Clock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <select
            value={dutyShift}
            onChange={(e) => setDutyShift(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white p-3 pl-10 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option>Sáng (7:30 - 11:30)</option>
            <option>Chiều (13:30 - 17:30)</option>
            <option>Tối (17:30 - 21:30)</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
      >
        <Send className="h-5 w-5 transition-transform group-hover:rotate-45" />
        Đăng ký ngay
      </button>
    </form>
  );
};
