import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from "react";
import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";

// Account type for localStorage-based auth
type Account = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  studentId?: string;
  avatar?: string;
};

// Initial seed accounts
const initialAccounts: Account[] = [
  {
    name: "Admin User",
    email: "23146053@student.hcmute.edu.vn",
    password: "admin123",
    role: "admin",
    studentId: "23146053"
  }
];

type User = {
  email: string;
  name: string;
  role: "admin" | "user";
  studentId?: string;
  avatar?: string;
  canAccessReports?: boolean;
};

type AuthContextValue = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (name: string) => Promise<boolean>;
  updateAvatar: (dataUrl: string | null) => Promise<boolean>;
  changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<boolean>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACCOUNTS_KEY = "fme:accounts";
const AUTH_USER_KEY = "fme:authUser";

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
      writeAccounts(initialAccounts);
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

  const signIn = useCallback(async (email: string, password: string) => {
    const accounts = readAccounts();
    const found = accounts.find(
      (a) => a.email === email && a.password === password
    );
    if (found) {
      setUser({
        email: found.email,
        name: found.name,
        role: found.role,
        studentId: found.studentId,
        avatar: (found as Account).avatar
      });
      return true;
    }
    return false;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      // Extract user info from Google
      const email = googleUser.email || "";
      const name = googleUser.displayName || "";
      const avatar = googleUser.photoURL || undefined;

      // Validate email format - must be HCMUTE student email
      if (!EMAIL_REGEX.test(email)) {
        // Sign out from Firebase if email is not valid
        await firebaseSignOut(auth);
        console.error("Invalid email format. Must be HCMUTE student email.");
        return false;
      }

      // Check if user already exists in local accounts
      const accounts = readAccounts();
      let existingAccount = accounts.find((a) => a.email === email);

      if (!existingAccount) {
        // Create new account for Google user
        // Extract student ID from HCMUTE email
        const emailMatch = EMAIL_REGEX.exec(email);
        const studentId = emailMatch ? emailMatch[1] : undefined;
        const role: "admin" | "user" =
          studentId === "23146053" ? "admin" : "user";

        const newAccount: Account = {
          name,
          email,
          password: "", // No password for Google auth
          role,
          studentId,
          avatar
        };

        accounts.push(newAccount);
        writeAccounts(accounts);
        existingAccount = newAccount;
      } else if (avatar && existingAccount.avatar !== avatar) {
        // Update avatar if changed
        const idx = accounts.findIndex((a) => a.email === email);
        accounts[idx] = { ...accounts[idx], avatar };
        writeAccounts(accounts);
      }

      setUser({
        email: existingAccount.email,
        name: existingAccount.name,
        role: existingAccount.role,
        studentId: existingAccount.studentId,
        avatar: avatar || existingAccount.avatar
      });

      return true;
    } catch (error) {
      console.error("Google sign-in error:", error);
      return false;
    }
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      // enforce email format: mssv@student.hcmute.edu.vn
      const m = EMAIL_REGEX.exec(email.trim());
      if (!m) return false;
      const studentId = m[1];

      const accounts = readAccounts();
      if (accounts.find((a) => a.email === email)) return false;

      const role: "admin" | "user" =
        studentId === "23146053" ? "admin" : "user";
      const nextAccount: Account = { name, email, password, role, studentId };
      const next = [...accounts, nextAccount];
      writeAccounts(next);
      setUser({ email, name, role, studentId });
      return true;
    },
    []
  );

  const updateAvatar = useCallback(
    async (dataUrl: string | null) => {
      if (!user) return false;
      try {
        const accounts = readAccounts();
        const idx = accounts.findIndex((a) => a.email === user.email);
        if (idx === -1) return false;
        accounts[idx] = {
          ...accounts[idx],
          avatar: dataUrl ?? undefined
        } as Account;
        writeAccounts(accounts);
        setUser((u) => (u ? { ...u, avatar: dataUrl ?? undefined } : u));
        return true;
      } catch {
        return false;
      }
    },
    [user]
  );

  const updateProfile = useCallback(
    async (name: string) => {
      if (!user) return false;
      try {
        const accounts = readAccounts();
        const idx = accounts.findIndex((a) => a.email === user.email);
        if (idx === -1) return false;
        accounts[idx] = { ...accounts[idx], name };
        writeAccounts(accounts);
        setUser((u) => (u ? { ...u, name } : u));
        return true;
      } catch {
        return false;
      }
    },
    [user]
  );

  const changePassword = useCallback(
    async (oldPassword: string, newPassword: string) => {
      if (!user) return false;
      try {
        const accounts = readAccounts();
        const idx = accounts.findIndex(
          (a) => a.email === user.email && a.password === oldPassword
        );
        if (idx === -1) return false;
        accounts[idx] = { ...accounts[idx], password: newPassword };
        writeAccounts(accounts);
        return true;
      } catch {
        return false;
      }
    },
    [user]
  );

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      signIn,
      signInWithGoogle,
      signUp,
      updateProfile,
      updateAvatar,
      changePassword,
      signOut
    }),
    [
      user,
      signIn,
      signInWithGoogle,
      signUp,
      updateProfile,
      updateAvatar,
      changePassword,
      signOut
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
