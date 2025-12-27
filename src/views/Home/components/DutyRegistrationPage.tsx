import { useState } from "react";
import { Notification } from "@/components/layout/Notification";
import { DutyRegistrationForm } from "./DutyRegistrationForm";

const DutyRegistrationPage = () => {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <section className="space-y-6 rounded-2xl bg-white p-6 shadow-xl shadow-blue-500/10 dark:bg-gray-800 dark:shadow-black/20">
            <div className="text-center">
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
                  Đăng Ký Ca Trực
                </span>
              </h1>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                Sinh viên vui lòng điền đầy đủ thông tin bên dưới để đăng ký
                lịch trực tại văn phòng Khoa.
              </p>
            </div>
            <DutyRegistrationForm onSuccess={() => setShowNotification(true)} />
          </section>
        </div>
      </div>

      {showNotification && (
        <Notification
          message="Bạn đã đăng ký ca trực thành công. Chúng tôi sẽ sớm liên hệ lại."
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default DutyRegistrationPage;
