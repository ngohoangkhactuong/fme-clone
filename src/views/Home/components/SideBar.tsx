import React from "react";
import { DigitalClock } from "./DigitalClock";
import { ProgramList } from "./ProgramList";
import {
  undergraduatePrograms,
  postgraduatePrograms
} from "@/dataSources/programs";

export const Sidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <DigitalClock />
      <ProgramList title="Ngành đào tạo" programs={undergraduatePrograms} />
      <ProgramList
        title="Đào tạo sau đại học"
        programs={postgraduatePrograms}
        titleColor="text-[#E11D48]"
      />
    </div>
  );
};
