import express from "express";
import {
  isAuthenticatedUser,
  isAuthorizedUser,
} from "../middlewares/auth.middleware.js";

import { userRoles } from "../Utills/Roles.js";
import {
  createOrder,
  getAllOrders,
  getAllOrdersForAdmin,
  getSingleOrder,
  updateOrderForAdmin,
  updateOrderForUser,
} from "../controllers/orderController.js";
const router = express.Router();

// CREATE A NEW ORDER
router.route("/order/newOrder").post(isAuthenticatedUser, createOrder);

// GET ALL ORDERS FOR LOGGED IN USER
router.route("/orders").get(isAuthenticatedUser, getAllOrders);

// GET SINGLE ORDER FOR LOGGED IN USER
router.route("/orders/:id").get(isAuthenticatedUser, getSingleOrder);

// UPDATE AN ORDER FOR A USER
router.route("/orders/:id").put(isAuthenticatedUser, updateOrderForUser);

// GET ALL ORDERS FOR SUPER ADMIN || ADMIN || EMPLOYEE
router
  .route("/admin/orders")
  .get(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    getAllOrdersForAdmin
  );

export default router;

// UPDATE AN ORDER FOR A USER
router
  .route("/admin/orders/:id")
  .put(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    updateOrderForAdmin
  );
