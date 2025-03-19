import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import SearchHistory from "../models/searchHistory.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";

// Get search history for a user
export const getSearchHistory = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.user_id;

  const searchHistory = await SearchHistory.findOne({ user: userId })
    .select("terms -_id")
    .sort({ "terms.timestamp": -1 });

  res.status(200).json({
    success: true,
    searchHistory: searchHistory
      ? searchHistory.terms.map((t) => t.term).slice(0, 10)
      : [],
  });
});

// Add term to search history
export const addToSearchHistory = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.user_id;
  const { term } = req.body;

  if (!term) {
    return next(new ErrorHandler("Search term is required", 400));
  }

  let searchHistory = await SearchHistory.findOne({ user: userId });

  if (!searchHistory) {
    searchHistory = await SearchHistory.create({
      user: userId,
      terms: [{ term }],
    });
  } else {
    // Remove existing term if it exists
    searchHistory.terms = searchHistory.terms.filter((t) => t.term !== term);

    // Add new term at the beginning
    searchHistory.terms.unshift({ term });

    // Keep only last 10 terms
    if (searchHistory.terms.length > 10) {
      searchHistory.terms = searchHistory.terms.slice(0, 10);
    }

    await searchHistory.save();
  }

  res.status(200).json({
    success: true,
    searchHistory: searchHistory.terms.map((t) => t.term),
  });
});

// Clear search history
export const clearSearchHistory = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.user_id;

  await SearchHistory.findOneAndDelete({ user: userId });

  res.status(200).json({
    success: true,
    message: "Search history cleared successfully",
  });
});

// Delete specific search term
export const deleteSearchTerm = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.user_id;
  const { term } = req.body;

  if (!term) {
    return next(new ErrorHandler("Search term is required", 400));
  }

  const searchHistory = await SearchHistory.findOne({ user: userId });

  if (!searchHistory) {
    return next(new ErrorHandler("Search history not found", 404));
  }

  // Remove the specific term
  searchHistory.terms = searchHistory.terms.filter((t) => t.term !== term);
  await searchHistory.save();

  res.status(200).json({
    success: true,
    searchHistory: searchHistory.terms.map((t) => t.term),
  });
});
