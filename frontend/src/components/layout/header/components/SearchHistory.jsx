import { Search, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

const SearchHistory = ({
  searchHistory,
  handleSearch,
  handleDeleteSearchTerm,
  handleClearAllHistory,
}) => {
  if (!searchHistory?.searchHistory?.length) return null;

  const handleItemClick = (term) => {
    handleSearch(term);
  };

  return (
    <section className="my-5">
      <header className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-400">Recent Searches</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAllHistory}
          className="h-8 text-gray-400 hover:text-red-400 hover:bg-transparent"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear All</span>
        </Button>
      </header>

      {searchHistory.searchHistory.map((term, index) => (
        <li
          key={index}
          className="flex items-center justify-between rounded-md hover:bg-brand-dark/50 transition-all duration-200 group"
        >
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="flex-1 h-auto p-3 justify-start text-sm hover:bg-transparent group-hover:text-accent min-w-0"
              onClick={() => handleItemClick(term)}
            >
              <Search className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-accent" />
              <span className="text-background group-hover:text-accent truncate ml-2">
                {term}
              </span>
            </Button>
          </SheetClose>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleDeleteSearchTerm(term, e)}
            className="h-8 w-8 shrink-0 text-background hover:text-red-400 hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </section>
  );
};

export default SearchHistory;
