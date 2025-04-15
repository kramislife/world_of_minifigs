import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { adminNavigation } from "@/constant/adminNavigation";
import { useLocation } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import { useState } from "react";

const DesktopSidebar = ({ isMinimized, toggleMinimize }) => {
  const location = useLocation();
  // Initialize state from localStorage
  const [openMenuPath, setOpenMenuPath] = useState(() => {
    return localStorage.getItem("openMenuPath");
  });

  // Update localStorage when openMenuPath changes
  const handleMenuToggle = (path) => {
    const newPath = openMenuPath === path ? null : path;
    setOpenMenuPath(newPath);
    if (newPath) {
      localStorage.setItem("openMenuPath", newPath);
    } else {
      localStorage.removeItem("openMenuPath");
    }
  };

  // Helper function to check if current path matches navigation item
  const isPathActive = (itemPath) => {
    if (itemPath === "/admin") {
      return location.pathname === itemPath;
    }

    const relatedPaths = {
      "/admin/products": [
        "/admin/products",
        "/admin/new-product",
        "/admin/update-product",
        "/admin/product-gallery",
      ],
      "/admin/colors": [
        "/admin/colors",
        "/admin/new-color",
        "/admin/update-color",
      ],
      "/admin/categories": [
        "/admin/categories",
        "/admin/new-category",
        "/admin/update-category",
        "/admin/subcategories",
        "/admin/new-subcategory",
        "/admin/update-subcategory",
      ],
      "/admin/collections": [
        "/admin/collections",
        "/admin/new-collection",
        "/admin/update-collection",
        "/admin/subcollections",
        "/admin/new-subcollection",
        "/admin/update-subcollection",
      ],
      "/admin/skill-levels": [
        "/admin/skill-levels",
        "/admin/new-skill-level",
        "/admin/update-skill-level",
      ],
      "/admin/designers": [
        "/admin/designers",
        "/admin/new-designer",
        "/admin/update-designer",
      ],
      "/admin/users": [
        "/admin/users",
        "/admin/new-user",
        "/admin/update-user",
      ],
      "/admin/orders": ["/admin/orders"],
      "/admin/reviews": ["/admin/reviews"],
    };

    // Check if current path exactly matches any of the related paths
    return (
      relatedPaths[itemPath]?.some(
        (path) =>
          location.pathname === path || location.pathname.startsWith(path + "/")
      ) || false
    );
  };

  return (
    <div
      className={`
        bg-darkBrand/30 border-r border-brand-end/50 hidden lg:block
        transition-all duration-300 ease-in-out h-full relative
        ${isMinimized ? "w-24" : "w-72"}
      `}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMinimize}
        className="absolute top-6 -right-5 z-50 hover:text-black"
      >
        {isMinimized ? (
          <ChevronsRight className="w-10 h-10" />
        ) : (
          <ChevronsLeft className="w-10 h-10" />
        )}
      </Button>

      <div className="flex flex-col h-full">
        {!isMinimized && (
          <div className="px-8 pt-9 pb-5">
            <h1 className="text-xl font-bold tracking-wide">
              World of Minifigures
            </h1>
          </div>
        )}

        <nav
          className={`
            p-4 space-y-2 overflow-y-auto scrollbar-none flex-1
            ${isMinimized ? "flex flex-col items-center" : ""}
          `}
        >
          {adminNavigation.map((item, index) => (
            <NavigationItem
              key={index}
              item={item}
              isActive={isPathActive(item.path)}
              isMinimized={isMinimized}
              isOpen={item.path === openMenuPath}
              onToggle={() => handleMenuToggle(item.path)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DesktopSidebar;
