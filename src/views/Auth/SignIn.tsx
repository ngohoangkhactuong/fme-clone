import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { User, Lock } from "lucide-react";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const EMAIL_REGEX = /^(\d+)@student\.hcmute\.edu\.vn$/i;
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Email phải có định dạng mssv@student.hcmute.edu.vn");
      return;
    }

    const ok = await signIn(email.trim(), password);
    if (ok) navigate(-1);
    else setError("Email hoặc mật khẩu không hợp lệ");
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-lg backdrop-blur-md dark:bg-gray-800/90">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Chào mừng trở lại</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Đăng nhập để tiếp tục
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <User size={16} />
            </span>
            <input
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pl-10 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
              type="email"
              required
              placeholder="you@university.edu"
            />
          </div>

          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <Lock size={16} />
            </span>
            <input
              aria-label="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pl-10 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <Link to="/auth/signup" className="text-blue-600 hover:underline">
            Chưa có tài khoản? Đăng ký
          </Link>
          <Link to="#" className="hidden underline sm:inline-block">
            Quên mật khẩu?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
