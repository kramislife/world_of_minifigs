import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchInput = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  isSearching 
}) => {
  return (
    <div className="relative">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(searchQuery);
        }}
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2 text-sm"
        disabled={isSearching}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      {searchQuery && !isSearching && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent text-gray-400"
          onClick={() => setSearchQuery("")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-accent rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;