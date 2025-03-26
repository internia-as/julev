import SearchField from "@/components/root/SearchField"; // Client Component
import LocalResults from "@/components/root/LocalResults"; // Server Component
import DivvunResults from "@/components/root/DivvunResults";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string; mode: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <div className="flex flex-col items-center w-full">
      <SearchField />
      <LocalResults query={query} />
      <DivvunResults query={query} />
    </div>
  );
}
