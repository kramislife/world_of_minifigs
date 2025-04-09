import { Search } from "lucide-react";

const SearchSuggestions = ({ searchResults, searchQuery, handleSearch }) => {
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
      productNameWords.some((word) => word.includes(searchQuery.toLowerCase()))
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

      // Exact match for the entire phrase
      if (aLower === query) return -1;
      if (bLower === query) return 1;

      // Check for exact phrase within the string
      const aExactMatch =
        aLower.includes(` ${query} `) ||
        aLower.startsWith(`${query} `) ||
        aLower.endsWith(` ${query}`);
      const bExactMatch =
        bLower.includes(` ${query} `) ||
        bLower.startsWith(`${query} `) ||
        bLower.endsWith(` ${query}`);

      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;

      // Then check if all words in the query appear in the item
      const queryWords = query.split(/\s+/).filter((word) => word.length > 2);
      const aMatchesAllWords = queryWords.every((word) =>
        aLower.includes(word)
      );
      const bMatchesAllWords = queryWords.every((word) =>
        bLower.includes(word)
      );

      if (aMatchesAllWords && !bMatchesAllWords) return -1;
      if (!aMatchesAllWords && bMatchesAllWords) return 1;

      // Then matches at start of word
      if (aLower.startsWith(query)) return -1;
      if (bLower.startsWith(query)) return 1;

      // Then alphabetical
      return aLower.localeCompare(bLower);
    });

    return (
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">{title}</h3>
        <div className="space-y-2">
          {sortedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center rounded-lg hover:bg-brand-dark/50 p-3 cursor-pointer group transition-all duration-200"
              onClick={() => handleSearch(item)}
            >
              <Search className="h-4 w-4 text-gray-400 group-hover:text-accent mr-2 shrink-0 transition-colors duration-200" />
              <span className="text-sm text-white group-hover:text-accent break-words overflow-hidden text-ellipsis transition-colors duration-200">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {renderSuggestionSection("Product Names", suggestions.names)}
      {renderSuggestionSection("Categories", suggestions.categories)}
      {renderSuggestionSection("Sub Categories", suggestions.subCategories)}
      {renderSuggestionSection("Collections", suggestions.collections)}
      {renderSuggestionSection("Sub Collections", suggestions.subCollections)}
      {renderSuggestionSection("Colors", suggestions.colors)}
    </div>
  );
};

export default SearchSuggestions;
