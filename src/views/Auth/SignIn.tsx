import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { User, Lock, ArrowRight } from "lucide-react";

const SignIn: React.FC = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleLoading(true);
    const ok = await signInWithGoogle();
    setIsGoogleLoading(false);
    if (ok) navigate(-1);
    else setError(t("auth.googleSignInFailed"));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100 dark:bg-blue-950 dark:ring-blue-900">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
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
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pr-4 pl-11 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
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
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pr-4 pl-11 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
                    type="password"
                    required
                    placeholder={t("auth.passwordPlaceholder")}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                  <svg
                    className="h-4 w-4 flex-shrink-0"
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
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow focus:ring-4 focus:ring-blue-500/20 disabled:opacity-70"
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

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                    {t("auth.orContinueWith")}
                  </span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="dark:hover:bg-gray-750 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-2.5 font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:ring-4 focus:ring-gray-200/50 disabled:opacity-70 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                {isGoogleLoading ? (
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
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    {t("auth.signInWithGoogle")}
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
