import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "@/redux/api/productApi";
import {
  useAddToSearchHistoryMutation,
  useGetSearchHistoryQuery,
  useDeleteSearchTermMutation,
  useClearSearchHistoryMutation,
} from "@/redux/api/searchApi";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";
import SearchInput from "./components/SearchInput";
import SearchHistory from "./components/SearchHistory";
import SearchSuggestions from "./components/SearchSuggestions";
import {
  SearchEmpty,
  NoSearchHistory,
  SearchingState,
} from "./components/SearchEmpty";

const LOCAL_STORAGE_KEY = "searchHistory";
const MAX_HISTORY_ITEMS = 10;

const SearchSheet = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [localSearchHistory, setLocalSearchHistory] = useState([]);
  const { user } = useSelector((state) => state.auth);

  // Get search history for logged-in users
  const { data: searchHistory } = useGetSearchHistoryQuery(undefined, {
    skip: !user,
  });

  // Mutations for search history
  const [addToSearchHistory] = useAddToSearchHistoryMutation();
  const [deleteSearchTerm] = useDeleteSearchTermMutation();
  const [clearSearchHistory] = useClearSearchHistoryMutation();

  // Load local search history on component mount
  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      setLocalSearchHistory(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // Fetch products based on search query
  const { data: searchResults, isFetching: isFetchingSuggestions } =
    useGetProductsQuery(
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

  const addToLocalSearchHistory = (term) => {
    const trimmedTerm = term.trim();
    setLocalSearchHistory((prevHistory) => {
      const newHistory = [
        trimmedTerm,
        ...prevHistory.filter((item) => item !== trimmedTerm),
      ].slice(0, MAX_HISTORY_ITEMS);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleSearch = async (term) => {
    if (!term.trim()) return;

    setIsSearching(true);

    if (user) {
      // Add to server search history if user is logged in
      try {
        await addToSearchHistory({ term: term.trim() });
      } catch (error) {
        console.error("Failed to add to search history:", error);
      }
    } else {
      // Add to local storage search history if user is not logged in
      addToLocalSearchHistory(term);
    }

    setTimeout(() => {
      setIsOpen(false);
      setIsSearching(false);
      navigate(`/products?keyword=${encodeURIComponent(term.trim())}`);
    }, 500);
  };

  const handleDeleteSearchTerm = async (term, e) => {
    e.stopPropagation(); // Prevent triggering the search when clicking delete

    if (user) {
      try {
        await deleteSearchTerm({ term }).unwrap();
      } catch (error) {
        console.error("Failed to delete search term:", error);
      }
    } else {
      setLocalSearchHistory((prevHistory) => {
        const newHistory = prevHistory.filter((item) => item !== term);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
        return newHistory;
      });
    }
  };

  const handleClearAllHistory = async () => {
    if (user) {
      try {
        await clearSearchHistory().unwrap();
      } catch (error) {
        console.error("Failed to clear search history:", error);
      }
    } else {
      setLocalSearchHistory([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const renderContent = () => {
    if (isSearching) {
      return <SearchingState />;
    }

    if (searchQuery) {
      if (isFetchingSuggestions) {
        return (
          <div className="py-12">
            <LoadingSpinner height="h-32" />
          </div>
        );
      }

      if (searchResults?.products?.length) {
        return (
          <SearchSuggestions
            searchResults={searchResults}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        );
      } else {
        return (
          <SearchEmpty searchQuery={searchQuery} handleSearch={handleSearch} />
        );
      }
    }

    // Show appropriate search history based on user login status
    const historyToShow = user
      ? searchHistory?.searchHistory
      : localSearchHistory;

    if (historyToShow?.length) {
      return (
        <SearchHistory
          searchHistory={
            user ? searchHistory : { searchHistory: historyToShow }
          }
          handleSearch={handleSearch}
          handleDeleteSearchTerm={handleDeleteSearchTerm}
          handleClearAllHistory={handleClearAllHistory}
        />
      );
    } else {
      return <NoSearchHistory />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="text-white hover:text-gray-200">
        <Search size={24} />
      </SheetTrigger>
      <SheetContent className="w-full max-w-[400px] lg:max-w-[600px] bg-brand-start gap-0 p-0 border-brand-end/50 flex flex-col h-full">
        <div className="flex-none">
          <SheetHeader className="p-5 border-b border-brand-end/50">
            <SheetTitle className="text-2xl font-semibold text-accent mb-5 text-left">
              Search
            </SheetTitle>
            <SheetDescription className="sr-only">
              Search for products, categories, collections and more
            </SheetDescription>
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              isSearching={isSearching}
            />
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-0">{renderContent()}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
