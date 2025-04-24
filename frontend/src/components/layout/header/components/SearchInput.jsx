import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isSearching,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      e.preventDefault();
      // Find and click the hidden search button
      document.getElementById("search-submit-button").click();
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search products, categories, collections..."
        className="pl-10 pr-4 py-2 text-sm"
        disabled={isSearching}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      {searchQuery && !isSearching && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={() => setSearchQuery("")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {/* Hidden submit button */}
      <SheetClose asChild>
        <button
          id="search-submit-button"
          className="hidden"
          onClick={() => handleSearch(searchQuery)}
        />
      </SheetClose>
    </div>
  );
};

export default SearchInput;
