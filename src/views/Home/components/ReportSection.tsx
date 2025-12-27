import React from "react";

type ReportSectionProps = {
  title: string;
  children: React.ReactNode;
};

export const ReportSection: React.FC<ReportSectionProps> = ({
  title,
  children
}) => (
  <section className="mb-4">
    <h2 className="mb-3 text-lg font-semibold">{title}</h2>
    <div className="rounded-md border border-gray-100 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      {children}
    </div>
  </section>
);

export default ReportSection;
