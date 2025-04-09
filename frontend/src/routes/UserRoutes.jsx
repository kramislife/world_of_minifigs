import Login from "@/components/auth/Login/Login";
import Register from "@/components/auth/Register/Register";
import AddProduct from "@/components/admin/Products/AddProduct";
import Dashboard from "@/components/admin/Dashboard/Dashboard";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import Products from "@/pages/Products/Products";
import ProductView from "@/pages/Products/ProductView";
import { Route, Outlet } from "react-router-dom";
import ViewProducts from "@/components/admin/Products/ViewProducts";
import ViewOrder from "@/components/admin/Order/ViewOrder";
import ViewUsers from "@/components/admin/Users/ViewUsers";
import ViewReviews from "@/components/admin/Reviews/ViewReviews";
import CollectionsPage from "@/components/home/components/CollectionsPage";
import Profile from "@/components/auth/Profile/Profile";
import Settings from "@/components/auth/Settings/Settings";
import UpdateProduct from "@/components/admin/Products/UpdateProduct";
import ViewCategory from "@/components/admin/Categories/ViewCategory";
import ViewCollection from "@/components/admin/Collections/ViewCollection";
import ViewSkillLevel from "@/components/admin/SkillLevel/ViewSkillLevel";
import ViewDesigner from "@/components/admin/Designers/ViewDesigner";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import AddCategory from "@/components/admin/Categories/AddCategory";
import UpdateCategory from "@/components/admin/Categories/UpdateCategory";
import AddCollection from "@/components/admin/Collections/AddCollection";
import UpdateCollection from "@/components/admin/Collections/UpdateCollection";
import AddSkillLevel from "@/components/admin/SkillLevel/AddSkillLevel";
import UpdateSkillLevel from "@/components/admin/SkillLevel/UpdateSkillLevel";
import AddDesigner from "@/components/admin/Designers/AddDesigner";
import UpdateDesigner from "@/components/admin/Designers/UpdateDesigner";
import ProductImages from "@/components/admin/Products/components/ProductImages";
import ViewColor from "@/components/admin/Colors/ViewColor";
import AddColor from "@/components/admin/Colors/AddColor";
import UpdateColor from "@/components/admin/Colors/UpdateColor";
import ViewSubCategories from "@/components/admin/Categories/SubCategory/ViewSubCategory";
import AddSubCategory from "@/components/admin/Categories/SubCategory/AddSubCategory";
import UpdateSubCategory from "@/components/admin/Categories/SubCategory/UpdateSubCategory";
import ViewSubCollections from "@/components/admin/Collections/SubCollections/ViewSubCollection";
import AddSubCollection from "@/components/admin/Collections/SubCollections/AddSubCollection";
import UpdateSubCollection from "@/components/admin/Collections/SubCollections/UpdateSubCollection";
import Checkout from "@/pages/Checkout/Checkout";
import Order from "@/pages/Order/Order";
import MyOrders from "@/pages/Order/MyOrders";
import SubCollectionsPage from "@/components/home/components/SubCollectionsPage";
// import AddUser from "@/components/admin/Users/AddUser";
import UpdateUser from "@/components/admin/Users/UpdateUser";
import EmailVerification from "@/components/auth/Register/EmailVerification";
import ForgotPassword from "@/components/auth/Password/ForgotPassword";
import ResetPassword from "@/components/auth/Password/ResetPassword";
import PrivacyPolicy from "@/components/layout/footer/components/PrivacyPolicy";
import TermsOfUse from "@/components/layout/footer/components/TermsOfUse";

const UserRoutes = (
  <>
    {/* Public Routes */}
    <Route index element={<Home />} />
    <Route path="products" element={<Products />} />
    <Route path="collections" element={<CollectionsPage />} />
    <Route path="collections/:id" element={<SubCollectionsPage />} />
    <Route path="products/best-selling/:id" element={<ProductView />} />
    <Route path="products/latest/:id" element={<ProductView />} />
    <Route path="products/:id" element={<ProductView />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="verify_user/:token" element={<EmailVerification />} />
    <Route path="password/forgot-password" element={<ForgotPassword />} />
    <Route path="password/reset-password/:token" element={<ResetPassword />} />
    <Route path="privacy-policy" element={<PrivacyPolicy />} />
    <Route path="terms-of-use" element={<TermsOfUse />} />

    {/* Protected User Routes */}
    <Route element={<ProtectedRoutes />}>
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="my-orders" element={<MyOrders />} />
      <Route path="order/:id" element={<Order />} />
    </Route>

    {/* Protected Admin/Employee Routes */}
    <Route
      path="admin"
      element={
        <ProtectedRoutes adminOnly={true}>
          <Outlet />
        </ProtectedRoutes>
      }
    >
      {/* Dashboard */}
      <Route index element={<Dashboard />} />

      {/* Product Management */}
      <Route path="products" element={<ViewProducts />} />
      <Route path="new-product" element={<AddProduct />} />
      <Route path="update-product/:id" element={<UpdateProduct />} />
      <Route path="product-gallery/:id" element={<ProductImages />} />

      {/* Color Management */}
      <Route path="colors" element={<ViewColor />} />
      <Route path="new-color" element={<AddColor />} />
      <Route path="update-color/:id" element={<UpdateColor />} />

      {/* Category Management */}
      <Route path="categories" element={<ViewCategory />} />
      <Route path="new-category" element={<AddCategory />} />
      <Route path="update-category/:id" element={<UpdateCategory />} />

      {/* Sub-Category Management */}
      <Route path="subcategories" element={<ViewSubCategories />} />
      <Route path="new-subcategory" element={<AddSubCategory />} />
      <Route path="update-subcategory/:id" element={<UpdateSubCategory />} />

      {/* Collection Management */}
      <Route path="collections" element={<ViewCollection />} />
      <Route path="new-collection" element={<AddCollection />} />
      <Route path="update-collection/:id" element={<UpdateCollection />} />

      {/* Sub-Collection Management */}
      <Route path="subcollections" element={<ViewSubCollections />} />
      <Route path="new-subcollection" element={<AddSubCollection />} />
      <Route
        path="update-subcollection/:id"
        element={<UpdateSubCollection />}
      />

      {/* Skill Level Management */}
      <Route path="skill-levels" element={<ViewSkillLevel />} />
      <Route path="new-skill-level" element={<AddSkillLevel />} />
      <Route path="update-skill-level/:id" element={<UpdateSkillLevel />} />

      {/* Designer Management */}
      <Route path="designers" element={<ViewDesigner />} />
      <Route path="new-designer" element={<AddDesigner />} />
      <Route path="update-designer/:id" element={<UpdateDesigner />} />

      {/* User Management */}
      <Route path="users" element={<ViewUsers />} />
      {/* <Route path="new-user" element={<AddUser />} /> */}
      <Route path="update-user/:id" element={<UpdateUser />} />

      {/* Order Management */}
      <Route path="orders" element={<ViewOrder />} />

      {/* Review Management */}
      <Route path="reviews" element={<ViewReviews />} />
    </Route>
  </>
);

export default UserRoutes;
