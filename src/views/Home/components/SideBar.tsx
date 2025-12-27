import { BookOpen, GraduationCap } from "lucide-react";
import { DigitalClock } from "./DigitalClock";
import { ProgramList } from "./ProgramList";
import {
  postgraduatePrograms,
  undergraduatePrograms
} from "@/dataSources/programs";

export const Sidebar = () => (
  <div className="space-y-6">
    <DigitalClock />
    <ProgramList
      gradient="from-blue-600 to-blue-700"
      icon={BookOpen}
      programs={undergraduatePrograms}
      title="Ngành đào tạo"
    />
    <ProgramList
      gradient="from-rose-600 to-rose-700"
      icon={GraduationCap}
      programs={postgraduatePrograms}
      title="Đào tạo sau đại học"
    />
  </div>
);
