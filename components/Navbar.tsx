import Link from "next/link";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("navbar");
  return (
    <>
      <div className="flex h-14 fixed justify-between items-center p-4 bg-slate-800 text-white w-full z-20">
        <div className="w-32"></div>
        <ul className="font-semibold space-x-10">
          <Link href="/">{t("search")}</Link>
          <Link href="/divvun">Divvun</Link>
          <Link href="/statistics">{t("statistics")}</Link>
          <Link href="/translate">{t("translate")}</Link>
          <Link href="/app">{t("app")}</Link>
          <Link href="/about">{t("about")}</Link>
        </ul>
        <LanguageDropdown />
      </div>
    </>
  );
};

export default Navbar;
