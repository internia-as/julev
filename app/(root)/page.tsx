import SearchField from "@/components/root/SearchField"; // Client Component
import DivvunResults from "@/components/root/DivvunResults";

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full">
      <SearchField />
      <DivvunResults />
    </div>
  );
}
