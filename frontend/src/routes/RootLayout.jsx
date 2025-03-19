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
    <div className="flex flex-col min-h-screen bg-brand-gradient text-light">
      <Header />
      <ScrollToTop />
      {showSidebar ? (
        // Admin Layout with Sidebar
        <div className="flex flex-1 pt-[90px] max-w-[1920px] mx-auto w-full">
          <div className="sticky top-[85px] h-screen">
            <Sidebar />
          </div>
          <main className="flex-1 p-5 overflow-y-auto scrollbar-none">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
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
