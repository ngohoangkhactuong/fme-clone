export interface NewsArticle {
  title: string;
  img: string;
  date: string;
}

export const newsData = [
  {
    title: "RECAP | BUỔI BỐC THĂM CHÍNH THỨC CỦA 'FRESHMAN CHAMPION 2025'",
    date: "02/10/2025",
    img: "/new_1.jpg",
    category: "Sự kiện",
    trending: true
  },
  {
    title: "TIÊU CHUẨN XÉT CHỌN DANH HIỆU 'SINH VIÊN 5 TỐT' - CẤP TRUNG ƯƠNG",
    date: "05/09/2025",
    img: "/new_2.jpg",
    category: "Đào tạo",
    trending: false
  },
  {
    title: "HCMUTE CHÀO MỪNG NĂM HỌC MỚI 2025-2026",
    date: "15/08/2025",
    img: "/new_3.jpg",
    category: "Tin tức",
    trending: true
  }
];
