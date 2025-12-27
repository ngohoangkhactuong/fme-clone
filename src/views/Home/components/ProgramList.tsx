import type { ComponentType } from "react";

type ProgramListProps = {
  title: string;
  programs: string[];
  icon: ComponentType<{ className?: string }>;
  gradient: string;
};

const ProgramItem = ({ program }: { program: string }) => (
  <li className="group/item relative cursor-pointer transition-all">
    <div className="flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 dark:hover:bg-gray-700/50">
      <div className="mt-1.5 flex h-2 w-2 shrink-0 items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-transform group-hover/item:scale-150" />
      </div>
      <span className="text-sm font-medium text-gray-700 transition-colors group-hover/item:text-blue-700 dark:text-gray-300 dark:group-hover/item:text-blue-400">
        {program}
      </span>
    </div>
  </li>
);

export const ProgramList = ({
  title,
  programs,
  icon: Icon,
  gradient
}: ProgramListProps) => (
  <div className="group overflow-hidden rounded-3xl bg-white shadow-lg shadow-blue-500/5 transition-all hover:shadow-xl hover:shadow-blue-500/10 dark:bg-gray-800 dark:shadow-black/20 dark:hover:shadow-black/30">
    <div className={`bg-gradient-to-r ${gradient} p-5`}>
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
    </div>

    <div className="p-5">
      <ul className="space-y-3">
        {programs.map((program) => (
          <ProgramItem key={program} program={program} />
        ))}
      </ul>
    </div>

    <div className="border-t border-gray-100 p-4 dark:border-gray-700">
      <button className="group/btn w-full rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 py-2.5 text-sm font-semibold text-blue-700 transition-all hover:from-blue-600 hover:to-blue-700 hover:text-white hover:shadow-lg dark:from-gray-700/50 dark:to-gray-700/80 dark:text-blue-300 dark:hover:from-blue-600 dark:hover:to-blue-700 dark:hover:text-white">
        Xem chi tiết →
      </button>
    </div>
  </div>
);
