class API_Filters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // KEYWORD SEARCH -> MULTIPLE KEYWORDS SEPARATED BY SPACE
  search() {
    if (this.queryStr.keyword) {
      const keywords = this.queryStr.keyword.trim().split(/\s+/);

      if (keywords.length > 0 && keywords[0] !== "") {
        const keywordFilter = {
          $or: keywords.map((word) => ({
            $or: [
              { product_name: { $regex: word, $options: "i" } },
              { product_description_1: { $regex: word, $options: "i" } },
            ],
          })),
        };

        console.log("KEYWORDS: ", keywords);

        this.query = this.query.find(keywordFilter); // Apply the constructed filter
      }
    } else {
      this.query = this.query.find();
    }

    this.query = this.query
      .populate("product_category", "name")
      .populate("product_collection", "name");

    return this;
  }

  // PRODUCT FILTER -> FILTER PRODUCTS BASED ON DIFFERENT ATTRIBUTES
  filters() {
    const queryCopy = { ...this.queryStr };

    // Fields to exclude from the filters
    const fieldsToRemove = ["keyword", "page"];
    fieldsToRemove.forEach((element) => delete queryCopy[element]);

    // Arrays to store OR conditions for specific fields
    const categoryConditions = [];
    const collectionConditions = [];
    const otherConditions = [];

    for (let key in queryCopy) {
      if (queryCopy[key]) {
        // Handle filters with multiple values (comma-separated)
        if (
          typeof queryCopy[key] === "string" &&
          queryCopy[key].includes(",")
        ) {
          queryCopy[key] = queryCopy[key]
            .split(",")
            .map((value) => value.trim());
        }

        // Handle product_category filters (with OR logic)
        if (key === "product_category") {
          if (Array.isArray(queryCopy[key])) {
            queryCopy[key].forEach((value) => {
              categoryConditions.push({ [key]: value });
            });
          } else {
            categoryConditions.push({ [key]: queryCopy[key] });
          }
        }
        // Handle product_collection filters (with OR logic)
        else if (key === "product_collection") {
          if (Array.isArray(queryCopy[key])) {
            queryCopy[key].forEach((value) => {
              collectionConditions.push({ [key]: value });
            });
          } else {
            collectionConditions.push({ [key]: queryCopy[key] });
          }
        }
        // Handle multiple price ranges
        else if (key === "price") {
          const priceRanges = Array.isArray(queryCopy[key])
            ? queryCopy[key]
            : [queryCopy[key]];

          const priceConditions = priceRanges.map(range => {
            if (range === "1000+") {
              return { price: { $gte: 1000 } };
            }
            
            const [minPrice, maxPrice] = range.split("-").map(parseFloat);
            return {
              price: { 
                $gte: minPrice, 
                $lte: maxPrice 
              }
            };
          });

          if (priceConditions.length > 0) {
            otherConditions.push({ $or: priceConditions });
          }
        }
        // Handle rating filter
        else if (key === "rating") {
          const ratingValues = Array.isArray(queryCopy[key])
            ? queryCopy[key]
            : [queryCopy[key]];

          const ratingConditions = ratingValues.map(rating => {
            const ratingNum = parseInt(rating);
            if (ratingNum === 5) {
              // For 5 stars, get ratings >= 5
              return { ratings: { $gte: 5 } };
            } else {
              // For other ratings, get within range (e.g., 4.0-4.9)
              return {
                ratings: { 
                  $gte: ratingNum,
                  $lt: ratingNum + 1
                }
              };
            }
          });
          
          if (ratingConditions.length > 0) {
            otherConditions.push({ $or: ratingConditions });
          }
        }
        // Handle other filters using $in
        else {
          otherConditions.push({ [key]: { $in: queryCopy[key] } });
        }
      }
    }

    // Combine conditions with $or and $and logic
    const orConditions = [];

    if (categoryConditions.length > 0) {
      orConditions.push({ $or: categoryConditions });
    }

    if (collectionConditions.length > 0) {
      orConditions.push({ $or: collectionConditions });
    }

    if (otherConditions.length > 0) {
      orConditions.push(...otherConditions);
    }

    // Apply the query
    if (orConditions.length > 0) {
      this.query = this.query.find({ $and: orConditions });
    }

    return this;
  }

  pagination(resPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.skip(skip).limit(resPerPage);
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
