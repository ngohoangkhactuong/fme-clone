import { CheckCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

type NotificationProps = {
  message: string;
  onClose: () => void;
};

export const Notification = ({ message, onClose }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, 4700);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-[100] w-full max-w-sm overflow-hidden rounded-2xl bg-white/95 shadow-2xl ring-1 shadow-green-500/20 ring-green-200 backdrop-blur-xl transition-all duration-300 dark:bg-gray-800/95 dark:ring-green-500/30 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-100 dark:bg-gray-700">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
          style={{
            animation: "shrink 5s linear forwards"
          }}
        />
      </div>

      <style>
        {`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>

      <div className="flex items-start gap-4 p-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 pt-0.5">
          <p className="font-bold text-gray-900 dark:text-gray-100">
            Thành công!
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
