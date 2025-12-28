import { STORAGE_KEYS } from "@/constants";
import type { Schedule, User } from "@/types";

export const storageService = {
  // User authentication
  getAuthUser: (): User | null => {
    const stored = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    return stored ? JSON.parse(stored) : null;
  },

  setAuthUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  },

  // Accounts management
  getAccounts: (): User[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    return stored ? JSON.parse(stored) : [];
  },

  setAccounts: (accounts: User[]): void => {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  },

  // Schedules
  getSchedules: (): Schedule[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
    return stored ? JSON.parse(stored) : [];
  },

  setSchedules: (schedules: Schedule[]): void => {
    localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
  },

  // Theme
  getTheme: (): "light" | "dark" =>
    (localStorage.getItem(STORAGE_KEYS.THEME) as "light" | "dark") || "light",

  setTheme: (theme: "light" | "dark"): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
};
