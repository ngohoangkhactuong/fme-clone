import { menuData } from "@/dataSources/menu";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
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
  const allowed =
    !!user &&
    (user.role === "admin" ||
      user.studentId === "23146053" ||
      registeredStudentEmails.includes(user.email));

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      {allowed ? (
        <Link
          className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 sm:inline-block"
          to="/dang-ky-truc"
        >
          <span className="relative z-10">Đăng ký ca trực</span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-700 to-blue-800 transition-transform duration-300 group-hover:translate-x-0" />
        </Link>
      ) : (
        <Link
          to="/auth/signin"
          title="Chỉ dành cho sinh viên đã đăng ký"
          className="hidden rounded-full border border-gray-200 bg-gray-100/60 px-6 py-2.5 text-sm font-semibold text-gray-600 sm:inline-block dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
        >
          Đăng ký ca trực
        </Link>
      )}

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
        <div className="flex items-center gap-3">
          <Link
            to="/account/profile"
            className="hidden text-sm font-medium hover:underline sm:inline-block"
          >
            {user.name}
          </Link>
          <Link
            to="/account/settings"
            className="hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 sm:inline-block dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Settings size={16} />
          </Link>
          <button
            onClick={signOut}
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300"
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            to="/auth/signin"
            className="text-sm text-blue-700 hover:underline"
          >
            Đăng nhập
          </Link>
          <Link
            to="/auth/signup"
            className="text-sm text-green-700 hover:underline"
          >
            Đăng ký
          </Link>
        </div>
      )}
    </div>
  );
};

const Navigation = () => (
  <nav className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white shadow-md">
    <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-2 gap-y-1 py-2 text-sm font-semibold uppercase">
      {menuData.map((item) => (
        <li key={item.label}>
          <Link
            className="block cursor-pointer rounded-md px-3 py-1.5 transition-all hover:bg-blue-500"
            to={item.path}
          >
            {item.label}
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
