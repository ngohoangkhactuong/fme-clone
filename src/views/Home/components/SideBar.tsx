import React from "react";
import { DigitalClock } from "./DigitalClock";
import { ProgramList } from "./ProgramList";
import {
  undergraduatePrograms,
  postgraduatePrograms
} from "@/dataSources/programs";
import { BookOpen, GraduationCap } from "lucide-react";

export const Sidebar: React.FC = () => (
  <div className="space-y-6">
    <DigitalClock />
    <ProgramList
      title="Ngành đào tạo"
      programs={undergraduatePrograms}
      icon={BookOpen}
      gradient="from-blue-600 to-blue-700"
    />
    <ProgramList
      title="Đào tạo sau đại học"
      programs={postgraduatePrograms}
      icon={GraduationCap}
      gradient="from-rose-600 to-rose-700"
    />
  </div>
);
