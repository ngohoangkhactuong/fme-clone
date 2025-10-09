export interface MenuItem {
  label: string;
  path: string;
}

export const menuData: MenuItem[] = [
  { label: "Home", path: "/" },
  { label: "Giới thiệu", path: "/gioi-thieu" },
  { label: "Đào tạo", path: "/dao-tao" },
  { label: "NCKH", path: "/nckh" },
  { label: "Kiểm định", path: "/kiem-dinh" },
  { label: "Biểu mẫu", path: "/bieu-mau" },
  { label: "Đoàn thể", path: "/doan-the" },
  { label: "Đoàn - Hội", path: "/doan-hoi" },
  { label: "English", path: "/en" }
];
