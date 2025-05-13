"use client";
import Link from "next/link";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslations } from "next-intl";
import React from "react";
import languages from "@/lib/languages";
import { Language } from "@/types/language";

const Navbar = () => {
  const t = useTranslations("navbar");
  const [lang, setLang] = React.useState(languages);

  React.useEffect(() => {
    // Get language from cookie
    const lang = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lang="))
      ?.split("=")[1];
    if (lang) {
      setLang((prevLang) =>
        prevLang.map((l) =>
          l.short === lang
            ? { ...l, selected: true }
            : { ...l, selected: false }
        )
      );
    }
  }, []);

  const handleLanguageChange = async (language: Language) => {
    // Set language in cookie
    setLang(
      lang.map((l) =>
        l.short === language.short
          ? { ...language, selected: true }
          : { ...l, selected: false }
      )
    );
    document.cookie = `lang=${language.short}; path=/; max-age=31536000`; // 1 year
    window.location.reload();
  };

  return (
    <>
      <div className="flex h-14 fixed justify-between items-center p-4 bg-slate-800 text-white w-full z-20">
        <div className="w-32"></div>
        <ul className="font-semibold space-x-10">
          <Link href="/">{t("search")}</Link>
          <Link href="/statistics">{t("statistics")}</Link>
          <Link href="/translate">{t("translate")}</Link>
          <Link href="/app">{t("app")}</Link>
          <Link href="/about">{t("about")}</Link>
        </ul>
        <LanguageDropdown
          languages={lang}
          toggleLanguage={handleLanguageChange}
        />
      </div>
    </>
  );
};

export default Navbar;
