export type MenuItem = {
  labelKey: string;
  path: string;
};

export const menuData: MenuItem[] = [
  { labelKey: "menu.home", path: "/" },
  { labelKey: "menu.introduction", path: "/gioi-thieu" },
  { labelKey: "menu.education", path: "/dao-tao" },
  { labelKey: "menu.research", path: "/nckh" },
  { labelKey: "menu.accreditation", path: "/kiem-dinh" },
  { labelKey: "menu.forms", path: "/bieu-mau" },
  { labelKey: "menu.unions", path: "/doan-the" },
  { labelKey: "menu.committees", path: "/doan-hoi" }
];
