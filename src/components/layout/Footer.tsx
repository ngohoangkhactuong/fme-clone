import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube
} from "lucide-react";
import { useTranslation } from "react-i18next";

const SOCIAL_LINKS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "Youtube" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" }
];

const SocialIconButton = ({
  icon: Icon,
  label
}: {
  icon: typeof Facebook;
  label: string;
}) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    className="group rounded-xl border border-gray-200 bg-white p-3 transition-all hover:border-blue-600 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    onClick={() => {}}
  >
    <Icon className="h-5 w-5 text-gray-600 transition-colors group-hover:text-blue-700 dark:text-gray-300 dark:group-hover:text-blue-300" />
  </button>
);

const FooterSection = () => {
  const { t } = useTranslation();
  return (
    <div className="lg:col-span-2">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
          <img
            alt="Logo"
            className="h-12 w-auto"
            src="/logo_cokhichetaomay.png"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {t("footer.departmentName")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("footer.universityName")}
          </p>
        </div>
      </div>
      <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        Đơn vị đào tạo kỹ sư cơ khí chất lượng cao, đáp ứng nhu cầu phát triển
        của ngành công nghiệp 4.0 và xã hội hiện đại.
      </p>
      <div className="flex gap-3">
        {SOCIAL_LINKS.map(({ icon, label }) => (
          <SocialIconButton icon={icon} key={label} label={label} />
        ))}
      </div>
    </div>
  );
};

const QuickLinksSection = () => {
  const { t } = useTranslation();
  const quickLinks = [
    t("footer.introduction"),
    t("footer.training"),
    t("footer.research"),
    t("footer.admission"),
    t("footer.contactUs")
  ];
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold text-gray-900 uppercase dark:text-white">
        {t("footer.quickLinks")}
      </h4>
      <ul className="space-y-3">
        {quickLinks.map((link) => (
          <li key={link}>
            <button
              type="button"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-300"
              onClick={() => {}}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 transition-all group-hover:w-3 dark:bg-blue-400" />
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContactItem = ({
  icon: Icon,
  href,
  text
}: {
  icon: typeof MapPin;
  href?: string;
  text: string;
}) => {
  const content = (
    <div className="flex gap-3">
      <div className="shrink-0 rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <li>
        <a
          className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          href={href}
        >
          {content}
        </a>
      </li>
    );
  }

  return <li>{content}</li>;
};

const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold text-gray-900 uppercase dark:text-white">
        {t("footer.contact")}
      </h4>
      <ul className="space-y-4">
        <ContactItem icon={MapPin} text="1 Võ Văn Ngân, TP. Thủ Đức, TP.HCM" />
        <ContactItem
          href="tel:+84389686411"
          icon={Phone}
          text="(+84) 3896 8641"
        />
        <ContactItem
          href="mailto:kckctm@hcmute.edu.vn"
          icon={Mail}
          text="kckctm@hcmute.edu.vn"
        />
      </ul>
    </div>
  );
};

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-blue-200/50 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 dark:border-blue-900/50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <FooterSection />
          <QuickLinksSection />
          <ContactSection />
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("footer.copyright")}
            </p>
            <div className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
              <button
                type="button"
                className="transition-colors hover:text-blue-700 dark:hover:text-blue-300"
                onClick={() => {}}
              >
                {t("footer.privacyPolicy")}
              </button>
              <button
                type="button"
                className="transition-colors hover:text-blue-700 dark:hover:text-blue-300"
                onClick={() => {}}
              >
                {t("footer.termsOfService")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
