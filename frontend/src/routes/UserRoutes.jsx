import Login from "@/components/auth/Login/Login";
import Register from "@/components/auth/Register/Register";
import AddProduct from "@/components/admin/Products/AddProduct";
import Dashboard from "@/components/admin/Dashboard/Dashboard";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import Products from "@/pages/Products/Products";
import ProductView from "@/pages/Products/ProductView";
import { Route } from "react-router-dom";
import AdminView from "@/pages/Admin/AdminView";
import ViewProducts from "@/components/admin/Products/ViewProducts";
import ViewOrder from "@/components/admin/Order/ViewOrder";
import ViewUsers from "@/components/admin/Users/ViewUsers";
import ViewReviews from "@/components/admin/Reviews/ViewReviews";
import CollectionsPage from "@/pages/Collections/CollectionsPage";
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

const UserRoutes = (
  <>
    {/* Public Routes */}
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />

    {/* Product Routes */}
    <Route path="products" element={<Products />} />
    <Route path="collections" element={<CollectionsPage />} />
    <Route path="products/best-selling/:id" element={<ProductView />} />
    <Route path="products/latest/:id" element={<ProductView />} />
    <Route path="products/:id" element={<ProductView />} />

    {/* Auth Routes */}
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />

    {/* Protected User Routes */}
    <Route
      path="profile"
      element={
        <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      }
    />
    <Route
      path="settings"
      element={
        <ProtectedRoutes>
          <Settings />
        </ProtectedRoutes>
      }
    />

    {/* Protected Admin/Employee Routes */}
    <Route
      path="admin"
      element={
        <ProtectedRoutes adminOnly={true}>
          <AdminView />
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

      {/* Collection Management */}
      <Route path="collections" element={<ViewCollection />} />
      <Route path="new-collection" element={<AddCollection />} />
      <Route path="update-collection/:id" element={<UpdateCollection />} />

      {/* Skill Level Management */}
      <Route path="skill-levels" element={<ViewSkillLevel />} />
      <Route path="new-skill-level" element={<AddSkillLevel />} />
      <Route path="update-skill-level/:id" element={<UpdateSkillLevel />} />

      {/* Designer Management */}
      <Route path="designers" element={<ViewDesigner />} />
      <Route path="new-designer" element={<AddDesigner />} />
      <Route path="update-designer/:id" element={<UpdateDesigner />} />

      {/* User & Order Management */}
      <Route path="users" element={<ViewUsers />} />
      <Route path="orders" element={<ViewOrder />} />
      <Route path="reviews" element={<ViewReviews />} />
    </Route>
  </>
);

export default UserRoutes;
