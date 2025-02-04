import { Search } from "lucide-react";
import React from "react";

const GlobalSearch = () => {
  return (
    <div className="md:flex gap-4 p-[16px] border-[1px] rounded-lg border-light-700 bg-light-800 flex-1 max-w-[600px] dark:dark-gradient dark:border-none hidden self-center ">
      <Search className="w-[24px] h-[24px] text-light-400" />
      <input
        type="text"
        className="outline-none bg-transparent  placeholder"
        placeholder="Search anything globally...."
      />
    </div>
  );
};

export default GlobalSearch;
