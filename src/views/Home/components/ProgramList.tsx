import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";

type ProgramListProps = {
  title: string;
  programKeys: string[];
  icon: ComponentType<{ className?: string }>;
  gradient: string;
};

const ProgramItem = ({ programKey }: { programKey: string }) => {
  const { t } = useTranslation();
  return (
    <li className="group/item cursor-pointer">
      <div className="flex items-start gap-2 rounded p-1.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="mt-1 flex h-1.5 w-1.5 shrink-0 items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
        </div>
        <span className="text-sm text-gray-700 transition-colors group-hover/item:text-blue-600 dark:text-gray-300 dark:group-hover/item:text-blue-400">
          {t(programKey)}
        </span>
      </div>
    </li>
  );
};

export const ProgramList = ({
  title,
  programKeys,
  icon: Icon,
  gradient
}: ProgramListProps) => {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
      <div
        className={`bg-gradient-to-r ${gradient} border-b border-white/10 p-4`}
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded bg-white/20 p-2 backdrop-blur-sm">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
        </div>
      </div>

      <div className="p-4">
        <ul className="space-y-2">
          {programKeys.map((programKey) => (
            <ProgramItem key={programKey} programKey={programKey} />
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-100 p-3 dark:border-gray-800">
        <button className="dark:hover:bg-gray-750 w-full rounded border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
          {t("home.viewDetails")}
        </button>
      </div>
    </div>
  );
};
