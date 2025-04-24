import { Input } from "@/components/ui/input";
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
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 py-3 bg-inherit
                  placeholder:text-gray-200 border border-brand-end/50 text-background"
      />
      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-200" />
    </div>
  );
};

export default SearchBar;
