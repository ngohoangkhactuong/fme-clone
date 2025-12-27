import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { User, Mail, Lock } from "lucide-react";

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const EMAIL_REGEX = /^(\d+)@student\.hcmute\.edu\.vn$/i;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Email phải có định dạng mssv@student.hcmute.edu.vn");
      return;
    }

    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }

    const ok = await signUp(name.trim(), email.trim(), password);
    if (ok) navigate(-1);
    else setError("Email đã tồn tại hoặc không hợp lệ");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tạo tài khoản
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Đăng ký để truy cập tính năng ca trực
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Họ và tên
              </label>
              <div className="relative mt-2">
                <User
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  id="name"
                  aria-label="Họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
                  required
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <div className="relative mt-2">
                <Mail
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  id="email"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
                  type="email"
                  required
                  placeholder="23146053@student.hcmute.edu.vn"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Email phải có định dạng mssv@student.hcmute.edu.vn
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Mật khẩu
              </label>
              <div className="relative mt-2">
                <Lock
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  id="password"
                  aria-label="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-blue-900"
                  type="password"
                  required
                  placeholder="Ít nhất 8 ký tự"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Mật khẩu phải có ít nhất 8 ký tự
              </p>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-2.5 font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Đăng ký
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Đã có tài khoản?{" "}
            </span>
            <Link
              to="/auth/signin"
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
