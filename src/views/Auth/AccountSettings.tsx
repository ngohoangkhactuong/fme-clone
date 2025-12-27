import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const AccountSettings: React.FC = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <p>Bạn cần đăng nhập để thay đổi thông tin.</p>
      </div>
    );
  }

  const handleName = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateProfile(name.trim());
    setMsg(ok ? "Cập nhật tên thành công" : "Không thể cập nhật tên");
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (newPwd.length < 8) {
      setMsg("Mật khẩu mới phải có ít nhất 8 ký tự");
      return;
    }
    if (newPwd !== confirmPwd) {
      setMsg("Xác nhận mật khẩu không khớp");
      return;
    }
    const ok = await changePassword(oldPwd, newPwd);
    setMsg(ok ? "Mật khẩu đã được thay đổi" : "Mật khẩu cũ không đúng");
    if (ok) {
      setOldPwd("");
      setNewPwd("");
      setConfirmPwd("");
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="space-y-6 rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
        <h1 className="text-xl font-semibold">Cài đặt tài khoản</h1>

        {msg && <div className="text-sm text-green-600">{msg}</div>}

        <form onSubmit={handleName} className="space-y-3">
          <label className="block text-sm font-medium">Họ và tên</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
          <div>
            <button className="rounded-md bg-blue-600 px-3 py-2 text-white">
              Lưu tên
            </button>
          </div>
        </form>

        <form onSubmit={handlePassword} className="space-y-3">
          <label className="block text-sm font-medium">Đổi mật khẩu</label>
          <input
            value={oldPwd}
            onChange={(e) => setOldPwd(e.target.value)}
            placeholder="Mật khẩu hiện tại"
            type="password"
            className="w-full rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
          <input
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            placeholder="Mật khẩu mới"
            type="password"
            className="w-full rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
          <input
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            placeholder="Xác nhận mật khẩu mới"
            type="password"
            className="w-full rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
          <div>
            <button className="rounded-md bg-green-600 px-3 py-2 text-white">
              Thay đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
