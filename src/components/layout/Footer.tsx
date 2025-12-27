import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube
} from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "Youtube" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" }
];

const QUICK_LINKS = [
  "Giới thiệu",
  "Đào tạo",
  "Nghiên cứu",
  "Tuyển sinh",
  "Liên hệ"
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
    className="group rounded-xl bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
    onClick={() => {}}
  >
    <Icon className="h-5 w-5 text-blue-100 transition-colors group-hover:text-blue-600" />
  </button>
);

const FooterSection = () => (
  <div className="lg:col-span-2">
    <div className="mb-4 flex items-center gap-3">
      <div className="rounded-xl bg-white/10 p-2 backdrop-blur-sm">
        <img
          alt="Logo"
          className="h-12 w-auto"
          src="/logo_cokhichetaomay.png"
        />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">
          Khoa Cơ Khí Chế Tạo Máy
        </h3>
        <p className="text-sm text-blue-200">ĐH Sư phạm Kỹ thuật TP.HCM</p>
      </div>
    </div>
    <p className="mb-6 text-sm leading-relaxed text-blue-100">
      Đơn vị đào tạo kỹ sư cơ khí chất lượng cao, đáp ứng nhu cầu phát triển của
      ngành công nghiệp 4.0 và xã hội hiện đại.
    </p>
    <div className="flex gap-3">
      {SOCIAL_LINKS.map(({ icon, label }) => (
        <SocialIconButton icon={icon} key={label} label={label} />
      ))}
    </div>
  </div>
);

const QuickLinksSection = () => (
  <div>
    <h4 className="mb-4 text-sm font-bold tracking-wider text-blue-300 uppercase">
      Liên kết nhanh
    </h4>
    <ul className="space-y-3">
      {QUICK_LINKS.map((link) => (
        <li key={link}>
          <button
            type="button"
            className="group flex items-center gap-2 text-sm text-blue-100 transition-colors hover:text-white"
            onClick={() => {}}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 transition-all group-hover:w-3" />
            {link}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

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
      <div className="shrink-0 rounded-lg bg-white/10 p-2 backdrop-blur-sm">
        <Icon className="h-4 w-4 text-blue-300" />
      </div>
      <div>
        <p className="text-sm text-blue-100">{text}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <li>
        <a
          className="text-sm text-blue-100 transition-colors hover:text-white"
          href={href}
        >
          {content}
        </a>
      </li>
    );
  }

  return <li>{content}</li>;
};

const ContactSection = () => (
  <div>
    <h4 className="mb-4 text-sm font-bold tracking-wider text-blue-300 uppercase">
      Liên hệ
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

export const Footer = () => (
  <footer className="relative overflow-hidden border-t border-blue-100 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
    <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
    <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
    <div className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <FooterSection />
          <QuickLinksSection />
          <ContactSection />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-blue-200">
              © 2025 Khoa Cơ Khí Chế Tạo Máy – Trường ĐH Sư phạm Kỹ thuật
              TP.HCM
            </p>
            <div className="flex gap-6 text-sm text-blue-200">
              <button
                type="button"
                className="transition-colors hover:text-white"
                onClick={() => {}}
              >
                Chính sách bảo mật
              </button>
              <button
                type="button"
                className="transition-colors hover:text-white"
                onClick={() => {}}
              >
                Điều khoản sử dụng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
