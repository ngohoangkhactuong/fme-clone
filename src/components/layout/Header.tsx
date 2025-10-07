import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-lg shadow-blue-500/5" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 opacity-10 blur-xl"></div>
              <img
                src="/favicon.ico"
                alt="HCMUTE Logo"
                className="relative h-16 w-auto transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-xl font-bold text-transparent">
                KHOA CƠ KHÍ CHẾ TẠO MÁY
              </h1>
              <p className="text-sm text-gray-600">
                Trường ĐH Sư phạm Kỹ thuật TP.HCM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40">
              <span className="relative z-10">Tuyển sinh 2025</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-700 to-blue-800 transition-transform duration-300 group-hover:translate-x-0"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
