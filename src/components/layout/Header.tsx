import { menuData } from "@/dataSources/menu";
import LanguageToggle from "@/components/common/LanguageToggle";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Settings, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { registeredStudentEmails } from "@/dataSources/registeredStudents";

type HeaderProps = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const Logo = () => {
  const { t } = useTranslation();
  return (
    <Link
      className="group flex items-center gap-2 transition-opacity hover:opacity-80"
      to="/"
    >
      <div className="flex-shrink-0">
        <div className="overflow-hidden rounded border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <img
            alt="HCMUTE Logo"
            className="h-9 w-9 object-cover"
            src="/logo_ckm.jpg"
          />
        </div>
      </div>
      <div className="hidden md:block">
        <h1 className="text-sm leading-tight font-semibold text-gray-900 dark:text-white">
          {t("header.departmentName")}
        </h1>
        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
          {t("header.universityName")}
        </p>
      </div>
    </Link>
  );
};

const HeaderActions = ({
  theme,
  toggleTheme
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
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
    <div className="flex items-center gap-1.5">
      <LanguageToggle />
      <button
        onClick={toggleTheme}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label={t("common.themeToggle")}
      >
        {theme === "light" ? (
          <Moon size={16} className="text-gray-600 dark:text-gray-400" />
        ) : (
          <Sun size={16} className="text-gray-400" />
        )}
      </button>

      <Link
        to="/calendar"
        className="hidden rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:inline-flex dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        {t("schedules.header")}
      </Link>

      {allowed ? (
        <Link
          to="/bao-cao-ca-truc"
          className="hidden rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:inline-flex dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label={t("common.report")}
        >
          {t("common.report")}
        </Link>
      ) : null}

      {user ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white dark:from-blue-600 dark:to-blue-700">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="hidden text-xs font-medium text-gray-900 sm:inline dark:text-white">
              {user.name.split(" ").slice(-1)[0]}
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1.5 w-56 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-100 p-2.5 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white dark:from-blue-600 dark:to-blue-700">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-1">
                <Link
                  to="/account/profile"
                  className="flex items-center gap-2 rounded px-2.5 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings
                    size={14}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  {t("common.profile")}
                </Link>
                {user.role === "admin" && (
                  <>
                    <Link
                      to="/admin/schedules"
                      className="flex items-center gap-2 rounded px-2.5 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Settings
                        size={14}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      {t("common.adminSchedules")}
                    </Link>
                    <Link
                      to="/admin/reports"
                      className="flex items-center gap-2 rounded px-2.5 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Settings
                        size={14}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      {t("common.adminReports")}
                    </Link>
                  </>
                )}
                <Link
                  to="/account/settings"
                  className="flex items-center gap-2 rounded px-2.5 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings
                    size={14}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  {t("common.settings")}
                </Link>
              </div>

              <div className="border-t border-gray-100 p-1 dark:border-gray-700">
                <button
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut size={14} />
                  {t("common.logout")}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <Link
            to="/auth/signin"
            className="hidden rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 sm:inline-block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t("common.signIn")}
          </Link>
          <Link
            to="/auth/signup"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:shadow-md dark:shadow-blue-500/20"
          >
            {t("common.signUp")}
          </Link>
        </div>
      )}
    </div>
  );
};

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <nav className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <ul className="scrollbar-hide mx-auto flex max-w-7xl items-center justify-center gap-0.5 overflow-x-auto px-2 py-1">
        {menuData.map((item) => (
          <li key={item.labelKey}>
            <Link
              className="block rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              to={item.path}
            >
              {t(item.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

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
      className={`sticky top-0 z-50 border-b transition-shadow ${
        scrolled
          ? "border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
          : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Logo />
          <HeaderActions theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
