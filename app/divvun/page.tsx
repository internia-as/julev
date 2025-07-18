import DivvunResults from "@/components/divvun/DivvunResults";
import SearchField from "@/components/SearchField";

const Divvun = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <SearchField title="divvun_title" subtitle="divvun_subtitle" />
      <DivvunResults />
    </div>
  );
};

export default Divvun;
