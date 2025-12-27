import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import type { MockAccount } from "@/dataSources/mockAccounts";
import { initialMockAccounts } from "@/dataSources/mockAccounts";

type User = {
  email: string;
  name: string;
  role: "admin" | "user";
  studentId?: string;
};

type AuthContextValue = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACCOUNTS_KEY = "fme:accounts";
const AUTH_USER_KEY = "fme:authUser";

type Account = MockAccount;

const readAccounts = (): Account[] => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Account[];
  } catch {
    return [];
  }
};

const writeAccounts = (accounts: Account[]) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

const EMAIL_REGEX = /^(\d+)@student\.hcmute\.edu\.vn$/i;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // seed accounts if none exist
  useEffect(() => {
    const existing = readAccounts();
    if (!existing || existing.length === 0) {
      writeAccounts(initialMockAccounts as Account[]);
    }
  }, []);

  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_USER_KEY);
  }, [user]);

  const signIn = async (email: string, password: string) => {
    const accounts = readAccounts();
    const found = accounts.find(
      (a) => a.email === email && a.password === password
    );
    if (found) {
      setUser({
        email: found.email,
        name: found.name,
        role: found.role,
        studentId: found.studentId
      });
      return true;
    }
    return false;
  };

  const signUp = async (name: string, email: string, password: string) => {
    // enforce email format: mssv@student.hcmute.edu.vn
    const m = EMAIL_REGEX.exec(email.trim());
    if (!m) return false;
    const studentId = m[1];

    const accounts = readAccounts();
    if (accounts.find((a) => a.email === email)) return false;

    const role: "admin" | "user" = studentId === "23146053" ? "admin" : "user";
    const nextAccount: Account = { name, email, password, role, studentId };
    const next = [...accounts, nextAccount];
    writeAccounts(next);
    setUser({ email, name, role, studentId });
    return true;
  };

  const signOut = () => setUser(null);

  const value = useMemo(() => ({ user, signIn, signUp, signOut }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
