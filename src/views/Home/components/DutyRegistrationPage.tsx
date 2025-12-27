import { useState } from "react";
import { Notification } from "@/components/layout/Notification";
import { DutyRegistrationForm } from "./DutyRegistrationForm";

const DutyRegistrationPage = () => {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Đăng Ký Ca Trực
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Sinh viên vui lòng điền đầy đủ thông tin bên dưới để đăng ký
                lịch trực tại văn phòng Khoa.
              </p>
            </div>
            <DutyRegistrationForm onSuccess={() => setShowNotification(true)} />
          </div>
        </div>
      </div>

      {showNotification && (
        <Notification
          message="✓ Bạn đã đăng ký ca trực thành công. Chúng tôi sẽ sớm liên hệ lại."
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default DutyRegistrationPage;
