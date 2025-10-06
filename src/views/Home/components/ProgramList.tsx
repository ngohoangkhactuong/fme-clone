import React from "react";

type ProgramListProps = {
  title: string;
  programs: string[];
  titleColor?: string;
};

export const ProgramList: React.FC<ProgramListProps> = ({
  title,
  programs,
  titleColor = "text-[#1E3A8A]"
}) => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow">
      <h3 className={`mb-3 text-lg font-semibold ${titleColor}`}>{title}</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {programs.map((program) => (
          <li key={program} className="cursor-pointer hover:text-blue-600">
            • {program}
          </li>
        ))}
      </ul>
    </div>
  );
};
