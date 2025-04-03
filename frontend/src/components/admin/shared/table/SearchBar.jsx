import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  const [searchValue, setSearchValue] = useState(value || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(searchValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, onChange]);

  return (
    <div className="relative flex-1 md:max-w-xs">
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-4 py-3 bg-brand-start border border-brand-end rounded-lg w-full 
                  focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent 
                  placeholder-gray-200 text-xs md:text-sm"
      />
      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-200" />
    </div>
  );
};

export default SearchBar;
