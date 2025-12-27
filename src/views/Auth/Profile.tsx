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
        <div className="h-40 w-full bg-gradient-to-r from-blue-700 to-indigo-600" />

        <div className="-mt-12 px-6 pb-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full bg-gray-100 ring-4 ring-white dark:ring-gray-900">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-gray-700">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="absolute right-0 bottom-0 -mr-2 -mb-2">
                <Link
                  to="/account/settings"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
                >
                  <Settings size={14} /> Chỉnh sửa
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                {user.email}{" "}
                {user.studentId ? <span className="mx-2">•</span> : null}{" "}
                {user.studentId && (
                  <span className="font-mono text-sm text-gray-600">
                    {user.studentId}
                  </span>
                )}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  <Users size={14} />{" "}
                  {user.role === "admin" ? "Admin" : "Sinh viên"}
                </span>
                <Link
                  to="/bao-cao-ca-truc"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:brightness-95"
                >
                  <FileText size={14} /> Báo cáo ca trực
                </Link>
              </div>
            </div>

            <div className="hidden md:flex md:items-center md:gap-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  0
                </div>
                <div className="text-xs text-gray-500">Reports</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  0
                </div>
                <div className="text-xs text-gray-500">Submitted</div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="col-span-2 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <Calendar size={16} /> Recent activity
              </h3>
              <div className="mt-3 space-y-3">
                <div className="rounded-md border border-dashed border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  Chưa có hoạt động gần đây.
                </div>
              </div>
            </div>

            <aside className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Thông tin
              </h4>
              <dl className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <dt className="font-medium">Email</dt>
                  <dd className="truncate">{user.email}</dd>
                </div>
                {user.studentId && (
                  <div>
                    <dt className="font-medium">MSSV</dt>
                    <dd>{user.studentId}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-medium">Role</dt>
                  <dd>{user.role}</dd>
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
