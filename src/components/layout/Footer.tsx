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
    className="group dark:hover:bg-gray-750 rounded-lg border border-gray-200 bg-white p-2.5 transition-all hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
    onClick={() => {}}
  >
    <Icon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
  </button>
);

const FooterSection = () => {
  const { t } = useTranslation();
  return (
    <div className="lg:col-span-2">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="rounded-lg bg-gray-50 p-2 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <img
            alt="Logo"
            className="h-10 w-auto"
            src="/logo_cokhichetaomay.png"
          />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {t("footer.departmentName")}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {t("footer.universityName")}
          </p>
        </div>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        Đơn vị đào tạo kỹ sư cơ khí chất lượng cao, đáp ứng nhu cầu phát triển
        của ngành công nghiệp 4.0 và xã hội hiện đại.
      </p>
      <div className="flex gap-2">
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
      <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
        {t("footer.quickLinks")}
      </h4>
      <ul className="space-y-2">
        {quickLinks.map((link) => (
          <li key={link}>
            <button
              type="button"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              onClick={() => {}}
            >
              <span className="h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2 group-hover:bg-blue-600 dark:bg-gray-600 dark:group-hover:bg-blue-400" />
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
    <div className="flex gap-2.5">
      <div className="shrink-0 rounded-lg bg-blue-50 p-1.5 ring-1 ring-blue-100 dark:bg-blue-950 dark:ring-blue-900">
        <Icon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
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
      <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
        {t("footer.contact")}
      </h4>
      <ul className="space-y-3">
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
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FooterSection />
          <QuickLinksSection />
          <ContactSection />
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {t("footer.copyright")}
            </p>
            <div className="flex gap-5 text-xs text-gray-600 dark:text-gray-400">
              <button
                type="button"
                className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => {}}
              >
                {t("footer.privacyPolicy")}
              </button>
              <button
                type="button"
                className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
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
