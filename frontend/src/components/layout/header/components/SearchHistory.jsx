import { Search, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchHistory = ({ 
  searchHistory, 
  handleSearch, 
  handleDeleteSearchTerm, 
  handleClearAllHistory 
}) => {
  if (!searchHistory?.searchHistory?.length) return null;

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-400">
          Recent Searches
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAllHistory}
          className="text-gray-400 hover:text-red-400 hover:bg-transparent"
        >
          <Trash2 className="h-4 w-4 mb-0.5" />
          Clear All
        </Button>
      </div>
      <div>
        {searchHistory.searchHistory.map((term, index) => (
          <div
            key={index}
            className="group flex items-center justify-between rounded-lg hover:bg-brand-dark/50 p-3 cursor-pointer transition-all duration-200"
          >
            <div
              className="flex-1 flex items-center overflow-hidden mr-2"
              onClick={() => handleSearch(term)}
            >
              <Search className="h-4 w-4 text-gray-400 group-hover:text-accent shrink-0 mr-2 transition-colors duration-200" />
              <span className="text-white text-sm line-clamp-1 text-left group-hover:text-accent transition-colors duration-200 w-full overflow-hidden text-ellipsis">
                {term}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => handleDeleteSearchTerm(term, e)}
              className="h-8 w-8 min-w-8 shrink-0 text-white hover:text-red-400 hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;