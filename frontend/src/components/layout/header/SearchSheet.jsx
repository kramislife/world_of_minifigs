import { useState, useEffect } from "react";
import {
  SheetContent,
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

const SearchSheet = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [localSearchHistory, setLocalSearchHistory] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const { data: searchHistory } = useGetSearchHistoryQuery(undefined, {
    skip: !user,
  });

  const [addToSearchHistory] = useAddToSearchHistoryMutation();
  const [deleteSearchTerm] = useDeleteSearchTermMutation();
  const [clearSearchHistory] = useClearSearchHistoryMutation();

  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      setLocalSearchHistory(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  const { data: searchResults, isFetching: isFetchingSuggestions } =
    useGetProductsQuery(searchQuery ? { keyword: searchQuery } : undefined, {
      skip: !searchQuery,
    });

  const addToLocalSearchHistory = (term) => {
    const trimmedTerm = term.trim();
    setLocalSearchHistory((prev) => {
      const newHistory = [
        trimmedTerm,
        ...prev.filter((item) => item !== trimmedTerm),
      ];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleSearch = async (term) => {
    if (!term.trim()) return;
    setIsSearching(true);
    if (user) {
      try {
        await addToSearchHistory({ term: term.trim() });
      } catch (error) {
        console.error("Failed to add to search history:", error);
      }
    } else {
      addToLocalSearchHistory(term);
    }
    setTimeout(() => {
      setIsSearching(false);
      navigate(`/products?keyword=${encodeURIComponent(term.trim())}`);
    }, 500);
  };

  const handleDeleteSearchTerm = async (term, e) => {
    e.stopPropagation();
    if (user) {
      try {
        await deleteSearchTerm({ term }).unwrap();
      } catch (error) {
        console.error("Failed to delete search term:", error);
      }
    } else {
      setLocalSearchHistory((prev) => {
        const newHistory = prev.filter((item) => item !== term);
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

  const historyToShow = user
    ? searchHistory?.searchHistory
    : localSearchHistory;

  const renderContent = () => {
    if (isSearching) return <SearchingState />;
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
    if (historyToShow?.length) {
      return (
        <SearchHistory
          searchHistory={
            user ? searchHistory : { searchHistory: localSearchHistory }
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
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Search</SheetTitle>
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
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="px-5 py-0">{renderContent()}</div>
      </div>
    </SheetContent>
  );
};

export default SearchSheet;
