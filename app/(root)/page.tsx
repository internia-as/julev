import LocalResults from "@/components/root/LocalResults";
import SearchField from "@/components/root/SearchField"; // Client Component

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full">
      <SearchField />
      <LocalResults />
    </div>
  );
}
