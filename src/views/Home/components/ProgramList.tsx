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
  <div className="group relative overflow-hidden rounded-3xl border border-blue-200/50 bg-white shadow-xl shadow-blue-200/30 backdrop-blur-sm transition-all hover:shadow-2xl dark:border-blue-700/50 dark:bg-gray-800 dark:shadow-blue-900/30">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/30" />
    <div
      className={`relative bg-gradient-to-r ${gradient} border-b border-white/10 p-6`}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white/20 p-2.5 shadow-lg backdrop-blur-sm">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white drop-shadow">{title}</h3>
      </div>
    </div>

    <div className="relative p-5">
      <ul className="space-y-2">
        {programs.map((program) => (
          <ProgramItem key={program} program={program} />
        ))}
      </ul>
    </div>

    <div className="relative border-t border-gray-100 p-4 dark:border-gray-700">
      <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40">
        Xem chi tiết →
      </button>
    </div>
  </div>
);
