import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";

export const SearchEmpty = ({ searchQuery, handleSearch }) => (
  <div className="flex flex-col items-center justify-center text-center py-10">
    <div className="bg-brand-dark/50 rounded-full p-5 mb-6">
      <Search size={36} className="text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-background mb-2">
      No Results Found
    </h3>
    <p className="text-gray-400 mb-6 text-sm md:text-base">
      We couldn't find any matches for "{searchQuery}". Try checking for typos
      or using more general terms.
    </p>
    <SheetClose asChild>
      <Button variant="accent" onClick={() => handleSearch(searchQuery)}>
        Search anyway
        <ArrowRight className="h-4 w-4" />
      </Button>
    </SheetClose>
  </div>
);

export const NoSearchHistory = () => (
  <div className="flex flex-col items-center justify-center text-center py-10">
    <div className="bg-brand-dark/50 rounded-full p-5 mb-6">
      <Search size={36} className="text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-background mb-3">
      No Search History
    </h3>
    <p className="text-gray-400 mb-6 text-sm md:text-base">
      Your recent searches will appear here. Try searching for products,
      categories, or collections to get started.
    </p>
  </div>
);

export const SearchingState = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <LoadingSpinner height="h-12 w-12" />
    <p className="text-gray-300 mt-5">Searching...</p>
  </div>
);
