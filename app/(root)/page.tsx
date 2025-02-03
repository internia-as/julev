// app/page.js
import SearchField from "@/components/root/SearchField"; // Client Component
import Results from "@/components/root/local/Results"; // Server Component

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <div className="flex  flex-col items-center">
      <SearchField />
      <Results query={query} />
    </div>
  );
}
