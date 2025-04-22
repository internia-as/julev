import SearchField from "@/components/root/SearchField"; // Client Component
import DivvunResults from "@/components/root/DivvunResults";
import { translationService } from "@/lib/translationService";
import { SupportedLanguages } from "@/types/supportedLanguages";

export default async function Page({
  params,
}: {
  params: Promise<{ q: string; lang: SupportedLanguages }>;
}) {
  const lang = (await params).lang;

  const query = (await params).q || "";
  const { t } = translationService(lang);

  return (
    <div className="flex flex-col items-center w-full">
      <SearchField />
      <h1>{t("root").header_subtitle}</h1>
      <DivvunResults query={query} />
    </div>
  );
}
