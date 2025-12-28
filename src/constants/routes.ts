export const ROUTES = {
  HOME: "/",
  AUTH: {
    SIGN_IN: "/auth/signin",
    SIGN_UP: "/auth/signup"
  },
  ACCOUNT: {
    PROFILE: "/account/profile",
    SETTINGS: "/account/settings"
  },
  ADMIN: {
    SCHEDULES: "/admin/schedules"
  },
  CALENDAR: "/calendar",
  DUTY_REPORT: "/bao-cao-ca-truc"
} as const;
