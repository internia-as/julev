import LocalResults from "@/components/root/LocalResults";
import SearchField from "@/components/root/SearchField"; // Client Component

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full">
      <SearchField title="julev_title" subtitle="julev_subtitle" />
      <LocalResults />
    </div>
  );
}
