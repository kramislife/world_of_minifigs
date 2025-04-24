import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/layout/scroll/ScrollToTop";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const RootLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if user is admin/employee and on admin routes
  const isAdminOrEmployee = ["admin", "employee", "superAdmin"].includes(
    user?.role
  );
  const isAdminRoute = location.pathname.startsWith("/admin");
  const showSidebar = isAdminOrEmployee && isAdminRoute;

  return (
    <div className="flex flex-col min-h-screen bg-brand-start text-background">
      <Header />
      {/* Show ScrollToTop based on screen size and route */}
      <div className={`${isAdminRoute ? "hidden lg:block" : "block"}`}>
        <ScrollToTop />
      </div>

      {showSidebar ? (
        // Admin Layout with Sidebar
        <div className="flex flex-1 pt-[90px] max-w-[1920px] mx-auto w-full">
          {/* Sidebar wrapper with responsive classes */}
          <div className="lg:sticky lg:top-[85px] lg:h-[calc(100vh-85px)]">
            <Sidebar />
          </div>
          {/* Main content area with responsive padding */}
          <main className="flex-1 overflow-y-auto scrollbar-none">
            <Outlet />
          </main>
        </div>
      ) : (
        // Regular Layout
        <main className="flex-grow pt-[85px]">
          <div className="max-w-[1920px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default RootLayout;
