export type MockAccount = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  studentId?: string;
};

// Seed data for local testing. The special MSSV allowed to perform actions is 23146053
export const initialMockAccounts: MockAccount[] = [
  {
    name: "Admin Sinh viên",
    email: "23146053@student.hcmute.edu.vn",
    password: "admin123",
    role: "admin",
    studentId: "23146053"
  },
  {
    name: "Nguyễn Văn A",
    email: "20190001@student.hcmute.edu.vn",
    password: "student123",
    role: "user",
    studentId: "20190001"
  }
];
