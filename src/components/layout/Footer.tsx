import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-blue-300 bg-[#003A78] text-white shadow-inner">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-sm md:flex-row">
        <div className="flex items-center gap-3 text-center md:text-left">
          <img
            src="/logo_cokhichetaomay.png"
            alt="HCMUTE Logo"
            className="h-10 w-auto drop-shadow-md transition-all hover:drop-shadow-lg"
          />
          <p className="font-medium tracking-wide">
            © 2025 Khoa Cơ Khí Chế Tạo Máy – Trường Đại học Sư phạm Kỹ thuật
            TP.HCM
          </p>
        </div>
        <div className="text-center leading-tight md:text-right">
          <p className="text-white/90">1 Võ Văn Ngân, TP. Thủ Đức, TP.HCM</p>
          <p className="text-white/90">
            Điện thoại: <span className="font-medium">(+84) 3896 8641</span>
          </p>
          <a
            href="mailto:kckctm@hcmute.edu.vn"
            className="font-medium transition-colors hover:text-yellow-200"
          >
            kckctm@hcmute.edu.vn
          </a>
        </div>
      </div>
    </footer>
  );
};
