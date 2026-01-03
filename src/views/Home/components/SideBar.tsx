import { BookOpen, GraduationCap } from "lucide-react";
import { DigitalClock } from "./DigitalClock";
import { ProgramList } from "./ProgramList";
import { useTranslation } from "react-i18next";

// Program translation keys for i18n
const undergraduateProgramKeys = [
  "programs.undergraduate.mechanicalEngineering",
  "programs.undergraduate.mechatronicsEngineering",
  "programs.undergraduate.automotiveEngineering",
  "programs.undergraduate.industrialManagement"
];

const postgraduateProgramKeys = [
  "programs.postgraduate.mechanicalEngineering",
  "programs.postgraduate.mechatronicsEngineering"
];

export const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <DigitalClock />
      <ProgramList
        gradient="from-blue-600 to-blue-700"
        icon={BookOpen}
        programKeys={undergraduateProgramKeys}
        title={t("home.undergraduatePrograms")}
      />
      <ProgramList
        gradient="from-rose-600 to-rose-700"
        icon={GraduationCap}
        programKeys={postgraduateProgramKeys}
        title={t("home.postgraduatePrograms")}
      />
    </div>
  );
};
