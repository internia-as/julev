import { cookies } from "next/headers";
import type { Metadata } from "next";

export const SITE_URL = "https://julev.no";

const LOCALES = ["nob", "eng", "smj"] as const;
type Locale = (typeof LOCALES)[number];

const OG_LOCALES: Record<Locale, string> = {
  nob: "nb-NO",
  eng: "en-US",
  smj: "smj-NO",
};

export interface PageMeta {
  title: string;
  description: string;
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value as Locale | undefined;
  return lang && LOCALES.includes(lang) ? lang : "nob";
}

async function getMetaMessages() {
  const locale = await getLocale();
  const messages = (await import(`../messages/${locale}.json`)).default;
  return messages.meta as {
    title: string;
    description: string;
    keywords: string;
    pages: Record<string, PageMeta>;
  };
}

export async function generateSiteMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = await getMetaMessages();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: "%s | Julevbágo",
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: "/" },
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: "Julevbágo",
      url: "/",
      locale: OG_LOCALES[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export async function generatePageMetadata(
  pageKey: string,
  path: string
): Promise<Metadata> {
  const locale = await getLocale();
  const meta = await getMetaMessages();
  const page = meta.pages[pageKey];
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: path,
      locale: OG_LOCALES[locale],
    },
    twitter: {
      title: page.title,
      description: page.description,
    },
  };
}