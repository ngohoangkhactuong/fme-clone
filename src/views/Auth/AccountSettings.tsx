import React, { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";

const AccountSettings: React.FC = () => {
  const { user, updateProfile, changePassword, updateAvatar } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar ?? null
  );
  const fileRef = useRef<HTMLInputElement | null>(null);
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

  const handleAvatarPick = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarPreview) {
      setMsg("Chưa có avatar để lưu");
      return;
    }
    const ok = await updateAvatar(avatarPreview);
    setMsg(ok ? "Avatar đã được cập nhật" : "Cập nhật avatar thất bại");
  };

  const handleAvatarRemove = async () => {
    const ok = await updateAvatar(null);
    if (ok) setAvatarPreview(null);
    setMsg(ok ? "Avatar đã bị xóa" : "Xóa avatar thất bại");
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="overflow-hidden rounded-2xl bg-white shadow-md dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-8 sm:px-8 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Cài đặt tài khoản
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Quản lý thông tin và bảo mật tài khoản của bạn
          </p>
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-8">
          {msg && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400">
              {msg}
            </div>
          )}

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ảnh đại diện
            </h2>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative flex-shrink-0">
                <div className="h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg ring-4 ring-white dark:from-gray-700 dark:to-gray-800 dark:ring-gray-900">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-blue-600">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <input
                    ref={fileRef}
                    onChange={(e) => handleAvatarPick(e.target.files?.[0])}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    Chọn ảnh
                  </button>
                  <button
                    onClick={handleAvatarSave}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Lưu ảnh
                  </button>
                  <button
                    type="button"
                    onClick={handleAvatarRemove}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    Xóa ảnh
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-8 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Thông tin cá nhân
            </h2>
            <form onSubmit={handleName} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Họ và tên
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
                />
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Lưu thay đổi
              </button>
            </form>
          </section>

          <section className="border-t border-gray-200 pt-8 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Bảo mật
            </h2>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Đổi mật khẩu
              </h3>
              <form onSubmit={handlePassword} className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    value={oldPwd}
                    onChange={(e) => setOldPwd(e.target.value)}
                    type="password"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mật khẩu mới
                  </label>
                  <input
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    type="password"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    type="password"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-900"
                  />
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700">
                  Thay đổi mật khẩu
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
