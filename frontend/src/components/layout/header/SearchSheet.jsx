import { useState, useEffect } from "react";
import {
  Search,
  Clock,
  Sparkles,
  TrendingUp,
  ArrowRight,
  X,
  Trash2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useViewport } from "@/hooks/Common/useViewport";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "@/redux/api/productApi";
import {
  useAddToSearchHistoryMutation,
  useGetSearchHistoryQuery,
  useDeleteSearchTermMutation,
  useClearSearchHistoryMutation,
} from "@/redux/api/searchApi";

const SearchSheet = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { user } = useSelector((state) => state.auth);

  // Get search history for logged-in users
  const { data: searchHistory } = useGetSearchHistoryQuery(undefined, {
    skip: !user,
  });

  // Mutations for search history
  const [addToSearchHistory] = useAddToSearchHistoryMutation();
  const [deleteSearchTerm] = useDeleteSearchTermMutation();
  const [clearSearchHistory] = useClearSearchHistoryMutation();

  // Fetch products based on search query
  const { data: searchResults } = useGetProductsQuery(
    debouncedQuery ? { keyword: debouncedQuery } : undefined,
    { skip: !debouncedQuery }
  );

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = async (term) => {
    if (!term.trim()) return;

    // Add to search history if user is logged in
    if (user) {
      try {
        await addToSearchHistory({ term: term.trim() });
      } catch (error) {
        console.error("Failed to add to search history:", error);
      }
    }

    setIsOpen(false);
    navigate(`/products?keyword=${encodeURIComponent(term.trim())}`);
  };

  const handleDeleteSearchTerm = async (term, e) => {
    e.stopPropagation(); // Prevent triggering the search when clicking delete
    try {
      await deleteSearchTerm({ term }).unwrap();
    } catch (error) {
      console.error("Failed to delete search term:", error);
    }
  };

  const handleClearAllHistory = async () => {
    try {
      await clearSearchHistory().unwrap();
    } catch (error) {
      console.error("Failed to clear search history:", error);
    }
  };

  const renderSearchSuggestions = () => {
    if (!searchResults?.products?.length) return null;

    // Group search results by different attributes
    const suggestions = {
      names: new Set(),
      categories: new Set(),
      subCategories: new Set(),
      collections: new Set(),
      subCollections: new Set(),
      colors: new Set(),
    };

    // Helper function to check if string contains search query
    const containsQuery = (str) =>
      str?.toLowerCase().includes(searchQuery.toLowerCase());

    // Populate suggestions with more strict matching
    searchResults.products.forEach((product) => {
      // Product names - check each word in the name
      const productNameWords = product.product_name.toLowerCase().split(" ");
      if (
        productNameWords.some((word) =>
          word.includes(searchQuery.toLowerCase())
        )
      ) {
        suggestions.names.add(product.product_name);
      }

      // Categories - only if they contain the exact search term
      product.product_category?.forEach((cat) => {
        if (containsQuery(cat.name)) {
          suggestions.categories.add(cat.name);
        }
      });

      // Sub-categories
      product.product_sub_categories?.forEach((subCat) => {
        if (containsQuery(subCat.name)) {
          suggestions.subCategories.add(subCat.name);
        }
      });

      // Collections
      product.product_collection?.forEach((coll) => {
        if (containsQuery(coll.name)) {
          suggestions.collections.add(coll.name);
        }
      });

      // Sub-collections
      product.product_sub_collections?.forEach((subColl) => {
        if (containsQuery(subColl.name)) {
          suggestions.subCollections.add(subColl.name);
        }
      });

      // Colors
      if (containsQuery(product.product_color?.name)) {
        suggestions.colors.add(product.product_color.name);
      }
    });

    const renderSuggestionSection = (title, items) => {
      if (items.size === 0) return null;

      // Sort items by relevance (exact matches first, then partial matches)
      const sortedItems = Array.from(items).sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const query = searchQuery.toLowerCase();

        // Exact matches first
        if (aLower === query) return -1;
        if (bLower === query) return 1;

        // Then matches at start of word
        if (aLower.startsWith(query)) return -1;
        if (bLower.startsWith(query)) return 1;

        // Then alphabetical
        return aLower.localeCompare(bLower);
      });

      return (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">{title}</h3>
          <div className="space-y-2">
            {sortedItems.map((item, index) => (
              <button
                key={index}
                className="w-full text-left px-2 py-1.5 hover:bg-gray-800 rounded-lg flex items-center gap-2"
                onClick={() => handleSearch(item)}
              >
                <Search className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-white">{item}</span>
              </button>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-2">
        {renderSuggestionSection("Product Names", suggestions.names)}
        {renderSuggestionSection("Categories", suggestions.categories)}
        {renderSuggestionSection("Sub Categories", suggestions.subCategories)}
        {renderSuggestionSection("Collections", suggestions.collections)}
        {renderSuggestionSection("Sub Collections", suggestions.subCollections)}
        {renderSuggestionSection("Colors", suggestions.colors)}
      </div>
    );
  };

  const renderSearchHistory = () => {
    if (!searchHistory?.searchHistory?.length) return null;

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-400">
            Recent Searches
          </h3>
          <button
            onClick={handleClearAllHistory}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        </div>
        <div className="space-y-2">
          {searchHistory.searchHistory.map((term, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-1.5 hover:bg-gray-800 rounded-lg group"
            >
              <button
                className="flex items-center gap-2 flex-grow text-left"
                onClick={() => handleSearch(term)}
              >
                <Search className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-white">{term}</span>
              </button>
              <button
                onClick={(e) => handleDeleteSearchTerm(term, e)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-700 rounded"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-red-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="text-white hover:text-gray-200">
        <Search size={24} />
      </SheetTrigger>
      <SheetContent className="w-full bg-brand-gradient p-0 z-[1000] overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Sticky Header and Search Form */}
          <div className="sticky top-0 px-6 pt-8 pb-4 border-b border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Search
              </h2>
            </div>

            {/* Search Form */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchQuery);
                  }
                }}
                placeholder="Search products..."
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-6 space-y-6">
              {searchQuery ? renderSearchSuggestions() : renderSearchHistory()}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;