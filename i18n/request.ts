import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  let locale = "nob"; // Default to Norwegian Bokmål

  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang");
  if (langCookie) {
    const lang = langCookie.value;
    if (lang) {
      locale = lang;
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
