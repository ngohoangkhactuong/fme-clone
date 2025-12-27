import { menuData } from "@/dataSources/menu";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Settings, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { registeredStudentEmails } from "@/dataSources/registeredStudents";

type HeaderProps = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const Logo = () => (
  <Link className="flex items-center gap-4" to="/">
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 opacity-10 blur-xl" />
      <img
        alt="HCMUTE Logo"
        className="relative h-16 w-auto transition-transform duration-300 hover:scale-105"
        src="/logo_ckm.jpg"
      />
    </div>
    <div className="hidden md:block">
      <h1 className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-xl font-bold text-transparent dark:from-blue-400 dark:to-blue-500">
        KHOA CƠ KHÍ CHẾ TẠO MÁY
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Trường ĐH Sư phạm Kỹ thuật TP.HCM
      </p>
    </div>
  </Link>
);

const HeaderActions = ({
  theme,
  toggleTheme
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const allowed =
    !!user &&
    (user.role === "admin" ||
      user.studentId === "23146053" ||
      registeredStudentEmails.includes(user.email));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
    return undefined;
  }, [menuOpen]);

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <Link
        to="/calendar"
        className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 sm:inline-block"
      >
        <span className="relative z-10">Lịch trực</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-700 to-blue-800 transition-transform duration-300 group-hover:translate-x-0" />
      </Link>

      {allowed ? (
        <Link
          to="/bao-cao-ca-truc"
          className="hidden rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-gray-50 sm:inline-block dark:border-gray-600 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700"
          aria-label="Báo cáo ca trực"
        >
          Báo cáo ca trực
        </Link>
      ) : (
        <Link
          to="/auth/signin"
          title="Chỉ dành cho sinh viên đã đăng ký"
          className="hidden rounded-full border border-gray-200 bg-gray-100/60 px-4 py-2 text-sm font-semibold text-gray-600 sm:inline-block dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
        >
          Báo cáo ca trực
        </Link>
      )}

      {user ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-blue-600">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="hidden text-sm font-medium text-gray-900 sm:inline dark:text-white">
              {user.name}
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-200/50 bg-white/95 shadow-2xl shadow-gray-200/50 backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-800/95 dark:shadow-black/20">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white/20 ring-2 ring-white/30">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-blue-100">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <Link
                  to="/account/profile"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Settings
                      size={16}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  Hồ sơ cá nhân
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin/schedules"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <Settings
                        size={16}
                        className="text-purple-600 dark:text-purple-400"
                      />
                    </div>
                    Quản lý lịch trực
                  </Link>
                )}
                <Link
                  to="/account/settings"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <Settings
                      size={16}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  </div>
                  Cài đặt tài khoản
                </Link>
                <button
                  onClick={() => {
                    toggleTheme();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    {theme === "light" ? (
                      <Moon size={16} className="text-amber-600" />
                    ) : (
                      <Sun size={16} className="text-amber-400" />
                    )}
                  </div>
                  Đổi giao diện
                </button>
              </div>

              <div className="border-t border-gray-200/50 p-2 dark:border-gray-700/50">
                <button
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                    <LogOut size={16} />
                  </div>
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2 sm:gap-3">
          <Link
            to="/auth/signin"
            className="hidden rounded-lg border border-blue-600 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 sm:inline-block dark:border-blue-500 dark:bg-transparent dark:text-blue-400 dark:hover:bg-blue-500/10"
          >
            Đăng nhập
          </Link>
          <Link
            to="/auth/signup"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-xl hover:shadow-blue-500/40 dark:from-blue-600 dark:to-blue-700"
          >
            Đăng ký
          </Link>
        </div>
      )}
    </div>
  );
};

const Navigation = () => (
  <nav className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white shadow-lg">
    <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-1 px-4 py-2">
      {menuData.map((item) => (
        <li key={item.label}>
          <Link
            className="group relative block cursor-pointer rounded-lg px-4 py-2 text-sm font-medium tracking-wide transition-all hover:bg-white/10"
            to={item.path}
          >
            <span className="relative z-10">{item.label}</span>
            <span className="absolute inset-x-4 -bottom-0.5 h-0.5 scale-x-0 rounded-full bg-white transition-transform group-hover:scale-x-100" />
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-lg shadow-blue-500/5 dark:bg-gray-900/80 dark:shadow-blue-400/10"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <HeaderActions theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
