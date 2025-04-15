class API_Filters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // KEYWORD SEARCH -> MULTIPLE KEYWORDS SEPARATED BY SPACE
  search() {
    // Skip if we're using the enhanced search
    if (this.queryStr.customQuery) {
      return this;
    }

    const keyword = this.queryStr.keyword
      ? {
          product_name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // PRODUCT FILTER -> FILTER PRODUCTS BASED ON DIFFERENT ATTRIBUTES
  filters() {
    const queryCopy = { ...this.queryStr };

    // If we have a custom query from enhanced search, use it
    if (this.queryStr.customQuery) {
      this.query = this.query.find(this.queryStr.customQuery);
      delete queryCopy.customQuery;
    }

    // Remove fields that are not filters
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Handle special cases for price and color
    if (queryCopy.price) {
      const priceRanges = Array.isArray(queryCopy.price)
        ? queryCopy.price
        : [queryCopy.price];

      const priceQueries = priceRanges.map((range) => {
        const [min, max] = range.split("-").map(Number);
        if (max) {
          return { price: { $gte: min, $lte: max } };
        }
        return { price: { $gte: min } };
      });

      if (priceQueries.length > 0) {
        delete queryCopy.price;
        this.query = this.query.find({ $or: priceQueries });
      }
    }

    if (queryCopy.product_color) {
      const colorIds = Array.isArray(queryCopy.product_color)
        ? queryCopy.product_color
        : [queryCopy.product_color];

      delete queryCopy.product_color;
      this.query = this.query.find({
        product_color: { $in: colorIds },
      });
    }

    // Format remaining filters
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }

  // method to handle sorting
  // sort() {
  //   if (this.queryStr.sort) {
  //     const [field, direction] = this.queryStr.sort.split('_');
  //     const sortOrder = direction === 'asc' ? 1 : -1;

  //     switch (field) {
  //       case 'name':
  //         this.query = this.query.sort({ product_name: sortOrder });
  //         break;
  //       case 'price':
  //         this.query = this.query.sort({ price: sortOrder });
  //         break;
  //       case 'date':
  //         this.query = this.query.sort({ createdAt: sortOrder });
  //         break;
  //       default:
  //         this.query = this.query.sort({ createdAt: -1 }); // Default sort
  //     }
  //   }
  //   return this;
  // }
}

export default API_Filters;
