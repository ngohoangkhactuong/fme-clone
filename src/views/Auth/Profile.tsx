import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Settings, FileText, Calendar, Users } from "lucide-react";

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <p>Bạn cần đăng nhập để xem profile.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="overflow-hidden rounded-2xl bg-white shadow-md dark:bg-gray-800">
        <div className="h-40 w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600" />

        <div className="px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg ring-4 ring-white dark:from-gray-700 dark:to-gray-800 dark:ring-gray-900">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-blue-600">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="absolute -right-1 -bottom-1 rounded-full bg-green-500 p-1.5 shadow-md" />
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {user.email}
                </p>
                {user.studentId && (
                  <p className="mt-1 font-mono text-xs text-gray-500 dark:text-gray-400">
                    MSSV: {user.studentId}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    <Users size={14} />
                    {user.role === "admin" ? "Admin" : "Sinh viên"}
                  </span>
                  <Link
                    to="/bao-cao-ca-truc"
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    <FileText size={14} /> Báo cáo ca trực
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/account/settings"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <Settings size={16} /> Chỉnh sửa
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-2 rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <Calendar size={16} /> Hoạt động gần đây
              </h3>
              <div className="mt-4">
                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  Chưa có hoạt động
                </div>
              </div>
            </div>

            <aside className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                Thông tin cá nhân
              </h4>
              <dl className="mt-4 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Email
                  </dt>
                  <dd className="mt-1 truncate text-gray-900 dark:text-gray-100">
                    {user.email}
                  </dd>
                </div>
                {user.studentId && (
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      MSSV
                    </dt>
                    <dd className="mt-1 text-gray-900 dark:text-gray-100">
                      {user.studentId}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Vai trò
                  </dt>
                  <dd className="mt-1 text-gray-900 dark:text-gray-100">
                    {user.role === "admin" ? "Quản trị viên" : "Sinh viên"}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
