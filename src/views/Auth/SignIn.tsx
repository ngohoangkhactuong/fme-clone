import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { User, Lock, ArrowRight } from "lucide-react";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const EMAIL_REGEX = /^(\d+)@student\.hcmute\.edu\.vn$/i;
    if (!EMAIL_REGEX.test(email.trim())) {
      setError(t("auth.invalidEmail"));
      setIsLoading(false);
      return;
    }

    const ok = await signIn(email.trim(), password);
    setIsLoading(false);
    if (ok) navigate(-1);
    else setError(t("auth.loginFailed"));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl bg-white shadow-md dark:bg-gray-800">
          <div className="px-8 pt-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t("common.signIn")}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t("auth.useHcmuteEmail")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="p-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("auth.studentEmail")}
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <User
                      className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-600"
                      size={18}
                    />
                  </div>
                  <input
                    id="email"
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-12 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
                    type="email"
                    required
                    placeholder={t("auth.emailPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("auth.passwordLabel")}
                </label>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock
                      className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-600"
                      size={18}
                    />
                  </div>
                  <input
                    id="password"
                    aria-label={t("auth.passwordLabel")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-12 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
                    type="password"
                    required
                    placeholder={t("auth.passwordPlaceholder")}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-70"
              >
                {isLoading ? (
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <>
                    {t("common.signIn")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <Link
                to="/auth/signup"
                className="font-medium text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
              >
                {t("auth.noAccount")}
                <span className="underline underline-offset-2">
                  {t("auth.signUpLink")}
                </span>
              </Link>
              <Link
                to="#"
                className="text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {t("auth.forgotPassword")}
              </Link>
            </div>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
          {t("auth.defaultPassword")}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
