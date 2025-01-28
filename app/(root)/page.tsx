// app/page.js
import SearchField from "@/components/root/SearchField"; // Client Component
import SearchResult from "@/components/root/SearchResult"; // Server Component

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <div className="h-full flex flex-col items-center space-y-1">
      <SearchField />
      <SearchResult query={query} />
    </div>
  );
}
