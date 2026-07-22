import Link from "next/link";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslations } from "next-intl";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const t = useTranslations("navbar");
  return (
    <>
      <nav className="flex h-14 fixed justify-between items-center p-4 bg-slate-800 text-white w-full z-20" aria-label={t("main_navigation")}>
        <div className="w-32 hidden md:block"></div>
        <div className="md:hidden">
          <Sidebar />
        </div>
        <ul className="font-semibold space-x-20 hidden md:flex">
          <li><Link href="/">{t("search")}</Link></li>
          <li><Link href="/translate">{t("translate")}</Link></li>
          <li><Link href="/grammar-checker">{t("grammar_checker")}</Link></li>
          <div className="hidden">
            <li><Link className="opacity-50" href="/app">{t("app")}</Link></li>
            <li><Link className="opacity-50" href="/about">{t("about")}</Link></li>
          </div>
        </ul>
        <LanguageDropdown />
      </nav>
    </>
  );
};

export default Navbar;
