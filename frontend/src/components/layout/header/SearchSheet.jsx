import { Search, Clock, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useViewport } from "@/hooks/Common/useViewport";

const SearchSheet = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useViewport();

  // Move mock data to a separate constants file later
  const recentSearches = [
    "Knitting Needles",
    "Wool Yarn",
    "Crochet Hooks",
    "Pattern Books",
  ];
  const popularCategories = ["Yarns", "Tools", "Patterns", "Accessories"];
  const trendingProducts = [
    { id: 1, name: "Merino Wool Bundle", price: "$24.99" },
    { id: 2, name: "Bamboo Needles Set", price: "$19.99" },
    { id: 3, name: "Beginner's Kit", price: "$39.99" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="text-white hover:text-gray-200">
        <Search size={24} />
      </SheetTrigger>
      <SheetContent className="w-full bg-brand-gradient p-0 z-[1000] overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Sticky Header and Search Form */}
          <div className="sticky top-0  px-6 pt-8 pb-4 border-b border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Search
              </h2>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full bg-darkBrand/40 border-white/10 text-white placeholder:text-gray-400 placeholder:text-sm h-14 rounded-2xl  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 pl-14 pr-4 text-lg shadow-lg backdrop-blur-xl"
                />
                <Search
                  size={22}
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </form>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-6 space-y-6">
              {/* Recent Searches */}
              <div className="bg-darkBrand/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 text-white mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Clock size={20} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Recent Searches</h3>
                </div>
                <ul className="space-y-4">
                  {recentSearches.map((search, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setSearchQuery(search)}
                        className="text-gray-300 hover:text-white transition-all duration-200 text-base flex items-center gap-2 w-full p-2 rounded-lg hover:bg-white/5 group"
                      >
                        <Search size={14} className="text-gray-400" />
                        <span className="flex-1 text-left">{search}</span>
                        <ArrowRight
                          size={14}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Categories */}
              <div className="bg-darkBrand/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 text-white mb-6">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Sparkles size={20} className="text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Popular Categories</h3>
                </div>
                <ul className="space-y-4">
                  {popularCategories.map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() =>
                          navigate(`/category/${category.toLowerCase()}`)
                        }
                        className="w-full p-2 rounded-lg hover:bg-white/5 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                            {category}
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-gray-400 transform transition-all duration-200 group-hover:translate-x-1 group-hover:text-white"
                          />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trending Products */}
              <div className="bg-darkBrand/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 text-white mb-6">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp size={20} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Trending Now</h3>
                </div>
                <ul className="space-y-4">
                  {trendingProducts.map((product) => (
                    <li key={product.id}>
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="w-full group"
                      >
                        <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-all duration-200">
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                            {product.name}
                          </span>
                          <span className="text-emerald-400 font-medium px-3 py-1 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-200">
                            {product.price}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
