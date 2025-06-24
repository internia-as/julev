import DivvunResults from "@/components/root/DivvunResults";
import SearchField from "@/components/root/SearchField";

const Divvun = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <SearchField title="divvun_title" subtitle="divvun_subtitle" />
      <DivvunResults />
    </div>
  );
};

export default Divvun;
