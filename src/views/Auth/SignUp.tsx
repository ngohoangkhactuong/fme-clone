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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = await signUp(name.trim(), email.trim(), password);
    if (ok) navigate(-1);
    else setError("Email đã tồn tại hoặc không hợp lệ");
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-lg backdrop-blur-md dark:bg-gray-800/90">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Tạo tài khoản mới</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Đăng ký với email trường để truy cập tính năng ca trực
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <User size={16} />
            </span>
            <input
              aria-label="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pl-10 text-sm focus:ring-2 focus:ring-green-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
              required
              placeholder="Họ và tên"
            />
          </div>

          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <Mail size={16} />
            </span>
            <input
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pl-10 text-sm focus:ring-2 focus:ring-green-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
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
              className="w-full rounded-lg border border-gray-200 px-3 py-2 pl-10 text-sm focus:ring-2 focus:ring-green-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
              type="password"
              required
              placeholder="Ít nhất 8 ký tự"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 font-semibold text-white shadow-md hover:from-green-700 hover:to-green-800"
          >
            Đăng ký
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <span>Đã có tài khoản? </span>
          <Link to="/auth/signin" className="text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
