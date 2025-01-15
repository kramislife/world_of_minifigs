// Helper function to calculate discounted price
const getDiscountedPrice = (product) => {
  return product.price - (product.price * (product.discount || 0)) / 100;
};

export const sortProducts = (products, sortType) => {
  const sortedProducts = [...products];

  switch (sortType) {
    case "name_asc":
      return sortedProducts.sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    case "name_desc":
      return sortedProducts.sort((a, b) =>
        b.product_name.localeCompare(a.product_name)
      );
    case "price_asc":
      return sortedProducts.sort(
        (a, b) => getDiscountedPrice(a) - getDiscountedPrice(b)
      );
    case "price_desc":
      return sortedProducts.sort(
        (a, b) => getDiscountedPrice(b) - getDiscountedPrice(a)
      );
    case "date_asc":
      return sortedProducts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    case "date_desc":
      return sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    default:
      return sortedProducts;
  }
};
