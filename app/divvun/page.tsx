import type { Metadata } from "next";
import DivvunResults from "@/components/divvun/DivvunResults";
import SearchField from "@/components/SearchField";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("divvun", "/divvun");
}

const Divvun = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <SearchField title="divvun_title" subtitle="divvun_subtitle" />
      <DivvunResults />
    </div>
  );
};

export default Divvun;
