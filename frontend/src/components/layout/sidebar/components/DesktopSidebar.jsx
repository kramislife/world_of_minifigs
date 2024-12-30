import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { adminNavigation } from "@/constant/adminNavigation";
import { useLocation } from "react-router-dom";
import NavigationItem from "./NavigationItem";

const DesktopSidebar = ({ isMinimized, toggleMinimize }) => {
  const location = useLocation();

  // Helper function to check if current path matches navigation item
  const isPathActive = (itemPath) => {
    // Handle dashboard route separately
    if (itemPath === '/admin') {
      return location.pathname === itemPath;
    }

    // Map of parent paths and their related paths
    const relatedPaths = {
      '/admin/products': ['/admin/products', '/admin/new-product', '/admin/update-product', '/admin/product-gallery'],
      '/admin/colors': ['/admin/colors', '/admin/new-color', '/admin/update-color'],
      '/admin/categories': ['/admin/categories', '/admin/new-category', '/admin/update-category'],
      '/admin/collections': ['/admin/collections', '/admin/new-collection', '/admin/update-collection'],
      '/admin/skill-levels': ['/admin/skill-levels', '/admin/new-skill-level', '/admin/update-skill-level'],
      '/admin/designers': ['/admin/designers', '/admin/new-designer', '/admin/update-designer'],
      '/admin/users': ['/admin/users'],
      '/admin/orders': ['/admin/orders'],
      '/admin/reviews': ['/admin/reviews'],
    };

    // Check if current path starts with any of the related paths
    return relatedPaths[itemPath]?.some(path => 
      location.pathname.startsWith(path)
    ) || false;
  };

  return (
    <div
      className={`
        bg-darkBrand/30 border-r border-white/20 hidden lg:block h-screen shadow-sm 
        transition-all duration-300 ease-in-out
        ${isMinimized ? "w-24" : "w-72"}
      `}
    >
      <div className="sticky top-0 h-full pt-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMinimize}
          className="absolute top-6 -right-5 z-10"
        >
          {isMinimized ? (
            <ChevronsRight className="w-10 h-10" />
          ) : (
            <ChevronsLeft className="w-10 h-10" />
          )}
        </Button>

        {!isMinimized && (
          <div className="px-8 pt-9 pb-5">
            <h1 className="text-xl font-bold tracking-wide">Brick Admin Panel</h1>
          </div>
        )}

        <nav
          className={`
            p-4 space-y-2 overflow-y-auto h-full
            ${isMinimized ? "flex flex-col items-center" : ""}
          `}
        >
          {adminNavigation.map((item, index) => (
            <NavigationItem
              key={index}
              item={item}
              isActive={isPathActive(item.path)}
              isMinimized={isMinimized}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DesktopSidebar;
