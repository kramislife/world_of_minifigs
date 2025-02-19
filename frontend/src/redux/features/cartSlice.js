import { createSlice, createSelector } from "@reduxjs/toolkit";
import { productApi } from "../api/productApi";

// Load initial state from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { cartItems: [] };
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return { cartItems: [] };
  }
};

const initialState = loadCartFromStorage();

const updateCartItem = (item, updatedProduct) => ({
  ...item,
  name: updatedProduct.product_name,
  image: updatedProduct.product_images?.[0]?.url || item.image,
  discounted_price: updatedProduct.discounted_price || updatedProduct.price,
  price: updatedProduct.price,
  discount: updatedProduct.discount,
  stock: updatedProduct.stock,
  color: updatedProduct.product_color?.name || null,
  includes: updatedProduct.product_includes || "",
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product === newItem.product
      );

      if (existingItemIndex !== -1) {
        // Check if adding one more would exceed stock
        const currentQuantity = state.cartItems[existingItemIndex].quantity;
        const stock = state.cartItems[existingItemIndex].stock;

        if (currentQuantity >= stock) {
          // Don't update if it would exceed stock
          return;
        }

        // Update quantity without changing position
        state.cartItems[existingItemIndex].quantity += 1;
      } else {
        // Add new item to the start of the array
        state.cartItems.unshift({ ...newItem, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product === product
      );

      if (itemIndex !== -1) {
        // Update quantity without changing position
        state.cartItems[itemIndex].quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
  // Add extraReducers to handle product updates
  extraReducers: (builder) => {
    // Handle product updates
    builder.addMatcher(
      productApi.endpoints.updateProduct.matchFulfilled,
      (state, { payload }) => {
        const updatedProduct = payload?.product;
        if (updatedProduct) {
          state.cartItems = state.cartItems.map((item) =>
            item.product === updatedProduct._id
              ? updateCartItem(item, updatedProduct)
              : item
          );
          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    );

    // Handle successful product fetch
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        if (payload?.products) {
          const updatedItems = state.cartItems.map((item) => {
            const updatedProduct = payload.products.find(
              (p) => p._id === item.product
            );
            return updatedProduct ? updateCartItem(item, updatedProduct) : item;
          });

          if (
            JSON.stringify(updatedItems) !== JSON.stringify(state.cartItems)
          ) {
            state.cartItems = updatedItems;
            localStorage.setItem("cart", JSON.stringify(state));
          }
        }
      }
    );

    // Handle successful single product fetch
    builder.addMatcher(
      productApi.endpoints.getProductDetails.matchFulfilled,
      (state, { payload }) => {
        const updatedProduct = payload?.product;
        if (updatedProduct) {
          state.cartItems = state.cartItems.map((item) =>
            item.product === updatedProduct._id
              ? updateCartItem(item, updatedProduct)
              : item
          );
          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    );
  },
});

// Selectors
const selectCartItems = (state) => state.cart.cartItems;

// Memoized selector for calculating total
export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.discounted_price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
  }
);

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
