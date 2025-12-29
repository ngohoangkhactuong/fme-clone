import React from "react";
import i18n from "@/i18n";

export const LanguageToggle: React.FC = () => {
  const current = i18n.language || "vi";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = e.target.value as "vi" | "en";
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("app:lang", lng);
    } catch {
      // ignore
    }
  };

  return (
    <select
      onChange={handleChange}
      value={current}
      className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900"
      aria-label="Language"
    >
      <option value="vi">VI</option>
      <option value="en">EN</option>
    </select>
  );
};

export default LanguageToggle;
