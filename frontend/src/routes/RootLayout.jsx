import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/layout/scroll/ScrollToTop";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-gradient text-light">
      <Header />
      <ScrollToTop />
      <main className="flex-grow pt-[85px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
