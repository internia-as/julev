import { useGlobalState } from "@/hooks/useGlobalState";
import { CircularProgress } from "@mui/material";
import React from "react";
interface Props {
  expanded: string | false;
  name: string;
  item: string;
}

const DivvunDictArticle = (props: Props) => {
  const state = useGlobalState();
  const [data, setData] = React.useState([] as any);
  const [searching, setSearching] = React.useState(false);

  React.useEffect(() => {
    if (props.item) {
      fetchData(props.item);
    }
  }, [props.item, props.expanded]);

  const fetchData = async (item: string) => {
    if (props.expanded !== props.name) return;
    setSearching(true);
    const res = await fetch("/api/divvun/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: item,
        langs: state.languages.filter((l) => l.selected).map((l) => l.short),
        dicts: state.dictionaries.filter((d) => d.selected).map((d) => d.short),
        operationName: "DictArticles",
      }),
    });
    const data = await res.json();
    console.log(data);
    setSearching(false);
  };

  if (searching) {
    return (
      <div className="w-full py-5 flex justify-center">
        <CircularProgress size={20} />
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-600">This is the Divvun Dictionary Article.</p>
    </div>
  );
};

export default DivvunDictArticle;
