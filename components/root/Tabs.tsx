import { Tab } from "@/types/root/Tab";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface Props {
  tabs: Tab[];
  updateTabs: (newTabs: Tab) => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = (props: Props) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:hidden">
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          defaultValue={props.tabs.find((tab) => tab.active)?.name}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {props.tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
        <ChevronDownIcon
          name="chevronDownIcon"
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:flex justify-center w-full">
        <nav
          aria-label="Tabs"
          className="isolate w-full md:w-2/3 2xl:w-1/2 flex divide-x divide-gray-200 rounded-lg shadow"
        >
          {props.tabs.map((tab, tabIdx) => (
            <div
              key={tab.name}
              aria-current={tab.active ? "page" : undefined}
              onClick={() => props.updateTabs(tab)}
              className={classNames(
                tab.active ? "text-gray-900" : "text-gray-500 hover:text-gray-100",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === props.tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-slate-600 text-white font-bold px-4 py-4 text-center cursor-pointer hover:bg-slate-700 focus:z-10"
              )}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.active ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-1"
                )}
              />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
