import express from "express";
import {
  getBestSellerProduct,
  getProduct,
  getProductById,
} from "../controllers/productController.js";

import {
  getAllCategories,
  getCategoryById,
  getCategoryByKey,
} from "../controllers/categoryController.js";

import {
  getAllCollections,
  getCollectionById,
} from "../controllers/collectionControler.js";

import {
  getAllSubCategories,
  getSubCategoryById,
} from "../controllers/subCategoryController.js";

import {
  getAllSubCollections,
  getSubCollectionById,
} from "../controllers/subCollectionController.js";

import {
  getAllSkillLevels,
  getSkillLevelById,
} from "../controllers/skillLevelController.js";
import {
  getAllDesigners,
  getDesignerById,
} from "../controllers/designerController.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getSingleAddress,
  updateAddress,
} from "../controllers/authController.js";
import { getAllColors } from "../controllers/colorController.js";
import {
  getSearchHistory,
  addToSearchHistory,
  clearSearchHistory,
  deleteSearchTerm,
} from "../controllers/searchHistoryController.js";

const router = express.Router();

// ---------------------------------- CATEGORIES --------------------------------------------------

// GET ALL CATEGORY
router.route("/categories").get(getAllCategories);

// GET CATEGORY BY KEY
router.route("/categories/:key").get(getCategoryByKey);

// GET CATEGORIES BY ID
router.route("/categories/:id").get(getCategoryById);

// ---------------------------------- COLLECTION --------------------------------------------------
// GET ALL COLLECTIONS
router.route("/collections").get(getAllCollections);

// GET COLLECTION BY ID
router.route("/collections/:id").get(getCollectionById);

// ---------------------------------- SUB-CATEGORIES ---------------------------------------------
// GET ALL SUB-CATEGORIES
router.route("/subcategories").get(getAllSubCategories);

// GET SUB-CATEGORY BY ID
router.route("/subcategories/:id").get(getSubCategoryById);

// ---------------------------------- SUB-COLLECTIONS ---------------------------------------------
// GET ALL SUB-COLLECTIONS
router.route("/subcollections").get(getAllSubCollections);

// GET SUB-COLLECTION BY ID
router.route("/subcollections/:id").get(getSubCollectionById);

// ---------------------------------- SKILL --------------------------------------------------
// GET ALL SKILLS
router.route("/skillLevels").get(getAllSkillLevels);

// GET SKILL BY ID
router.route("/skillLevels/:id").get(getSkillLevelById);

// ---------------------------------- DESIGNER --------------------------------------------------
// GET ALL DESIGNERS
router.route("/designers").get(getAllDesigners);

// GET DESIGNER BY ID
router.route("/designers/:id").get(getDesignerById);

// ---------------------------------- PRODUCTS --------------------------------------------------

// GET ALL PRODUCTS
router.route("/products").get(getProduct);

// GET ALL BEST SELLER PRODUCTS
router.route("/products/best-seller").get(getBestSellerProduct);

// GET PRODUCT BY ID
router.route("/products/:id").get(getProductById);

// ---------------------------------------------------- ADDRESS ------------------------------------------------

// GET ALL ADDRESS

// CREATE NEW ADDRESS
router.route("/me/createAddress").post(isAuthenticatedUser, createAddress);

// UPDATE AN ADDRESS OF A USER
router.route("/me/addresses/:id").patch(isAuthenticatedUser, updateAddress);

// GET ALL ADDRESSES
router.route("/me/addresses").get(isAuthenticatedUser, getAllAddresses);

// GET SINGLE ADDRESS FOR A USER
router.route("/me/addresses/:id").get(isAuthenticatedUser, getSingleAddress);

// DELETE AN ADDRESS
router.route("/me/addresses/:id").delete(isAuthenticatedUser, deleteAddress);

// ---------------------------------- COLORS --------------------------------------------------
// GET ALL COLORS
router.route("/colors").get(getAllColors);

// ---------------------------------- SEARCH HISTORY --------------------------------------------------
router
  .route("/search/history")
  .get(isAuthenticatedUser, getSearchHistory)
  .post(isAuthenticatedUser, addToSearchHistory)
  .delete(isAuthenticatedUser, clearSearchHistory);

router
  .route("/search/history/term")
  .delete(isAuthenticatedUser, deleteSearchTerm);

export default router;
