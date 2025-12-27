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
    <div className="mx-auto max-w-6xl p-6">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        <div className="h-48 w-full bg-gradient-to-r from-blue-700 to-indigo-600" />

        <div className="px-6 py-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative">
                <div className="h-28 w-28 overflow-hidden rounded-full bg-gray-100 shadow-lg ring-4 ring-white dark:ring-gray-900">
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
                <Link
                  to="/account/settings"
                  className="absolute right-0 bottom-0 rounded-full bg-blue-600 p-2 text-white shadow-md hover:bg-blue-700"
                  title="Chỉnh sửa"
                >
                  <Settings size={16} />
                </Link>
              </div>

              <div>
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
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    <Users size={12} />
                    {user.role === "admin" ? "Admin" : "Sinh viên"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  0
                </div>
                <div className="text-xs text-gray-500">Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  0
                </div>
                <div className="text-xs text-gray-500">Submitted</div>
              </div>
              <Link
                to="/bao-cao-ca-truc"
                className="inline-flex items-center gap-2 self-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <FileText size={16} /> Báo cáo ca trực
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-2 rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <Calendar size={16} /> Recent activity
              </h3>
              <div className="mt-4">
                <div className="rounded-md border border-dashed border-gray-200 p-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  Chưa có hoạt động gần đây.
                </div>
              </div>
            </div>

            <aside className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Thông tin
              </h4>
              <dl className="mt-3 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <dt className="font-medium text-gray-500">Email</dt>
                  <dd className="truncate text-gray-900 dark:text-gray-100">
                    {user.email}
                  </dd>
                </div>
                {user.studentId && (
                  <div>
                    <dt className="font-medium text-gray-500">MSSV</dt>
                    <dd className="text-gray-900 dark:text-gray-100">
                      {user.studentId}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="font-medium text-gray-500">Role</dt>
                  <dd className="text-gray-900 dark:text-gray-100">
                    {user.role}
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
