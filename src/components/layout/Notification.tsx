import { CheckCircle, X } from "lucide-react";
import { useEffect } from "react";

type NotificationProps = {
  message: string;
  onClose: () => void;
};

export const Notification = ({ message, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-[100] w-full max-w-sm rounded-lg bg-white p-4 shadow-2xl ring-1 shadow-green-500/20 ring-green-200 dark:bg-gray-800 dark:ring-green-500/30">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-800 dark:text-gray-100">
            Thành công!
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>
        </div>
        <div className="shrink-0">
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            aria-label="Close notification"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
