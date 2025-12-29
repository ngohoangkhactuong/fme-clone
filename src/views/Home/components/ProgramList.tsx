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
    <li className="group/item relative cursor-pointer">
      <div className="flex items-start gap-2 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
        <div className="mt-1.5 flex h-1.5 w-1.5 shrink-0 items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 transition-transform group-hover/item:scale-125" />
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
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div
        className={`bg-gradient-to-r ${gradient} border-b border-white/10 p-4`}
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-white/20 p-2 shadow-sm backdrop-blur-sm">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-base font-semibold text-white drop-shadow-sm">
            {title}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <ul className="space-y-1">
          {programKeys.map((programKey) => (
            <ProgramItem key={programKey} programKey={programKey} />
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-100 p-3 dark:border-gray-800">
        <button className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md">
          {t("home.viewDetails")}
        </button>
      </div>
    </div>
  );
};
