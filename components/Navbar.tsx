import Link from "next/link";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslations } from "next-intl";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const t = useTranslations("navbar");
  return (
    <>
      <div className="flex h-14 fixed justify-between items-center p-4 bg-slate-800 text-white w-full z-20">
        <div className="w-32 hidden md:block"></div>
        <div className="md:hidden">
          <Sidebar />
        </div>
        <ul className="font-semibold space-x-20 hidden md:flex">
          <Link href="/">{t("search")}</Link>
          <Link href="/translate">{t("translate")}</Link>
          <Link href="/grammar-checker">{t("grammar_checker")}</Link>
          <div className="hidden">
            <Link className="opacity-50" href="/app">
              {t("app")}
            </Link>
            <Link className="opacity-50" href="/about">
              {t("about")}
            </Link>
          </div>
        </ul>
        <LanguageDropdown />
      </div>
    </>
  );
};

export default Navbar;
