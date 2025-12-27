export type NewsArticle = {
  category: string;
  date: string;
  img: string;
  title: string;
  trending: boolean;
  url: string;
};

export const newsData: NewsArticle[] = [
  {
    category: "Sự kiện",
    date: "02/10/2025",
    img: "/new_1.jpg",
    title: "RECAP | BUỔI BỐC THĂM CHÍNH THỨC CỦA 'FRESHMAN CHAMPION 2025'",
    trending: true,
    url: "https://www.facebook.com/share/19hqTid6UC/"
  },
  {
    category: "Đào tạo",
    date: "05/09/2025",
    img: "/new_2.jpg",
    title: "TIÊU CHUẨN XÉT CHỌN DANH HIỆU 'SINH VIÊN 5 TỐT' - CẤP TRUNG ƯƠNG",
    trending: false,
    url: "https://www.facebook.com/share/19d4Th57Un/"
  },
  {
    category: "Tin tức",
    date: "15/08/2025",
    img: "/new_3.jpg",
    title: "HCMUTE CHÀO MỪNG NĂM HỌC MỚI 2025-2026",
    trending: true,
    url: "https://www.facebook.com/share/1HMBdygYWd/"
  }
];
