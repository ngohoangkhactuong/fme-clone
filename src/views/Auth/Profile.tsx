import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

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
    <div className="mx-auto max-w-3xl p-6">
      <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-green-400 p-1">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white text-xl font-semibold text-gray-700 dark:bg-gray-900">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="mt-1 text-sm text-gray-500">Role: {user.role}</p>
            {user.studentId && (
              <p className="text-sm text-gray-500">MSSV: {user.studentId}</p>
            )}
            <div className="mt-4">
              <Link
                to="/account/settings"
                className="text-blue-600 hover:underline"
              >
                Chỉnh sửa tài khoản
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
