import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Bot } from "lucide-react";
import { adminNavigation } from "@/constant/adminNavigation";
import { useLocation } from "react-router-dom";
import NavigationItem from "./NavigationItem";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      "/admin/users": ["/admin/users", "/admin/new-user", "/admin/update-user"],
      "/admin/orders": ["/admin/orders"],
      "/admin/reviews": ["/admin/reviews"],
    };

    return (
      relatedPaths[itemPath]?.some(
        (path) =>
          location.pathname === path || location.pathname.startsWith(path + "/")
      ) || false
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="fixed bottom-5 right-5 z-50 p-3 bg-accent rounded-full lg:hidden">
        <Bot size={28} className="text-foreground" />
      </SheetTrigger>

      <SheetContent side="left" onInteractOutside={() => setIsOpen(false)}>
        <SheetHeader className="pb-0">
          <SheetTitle>Admin Dashboard</SheetTitle>
          <SheetDescription className="sr-only">
            Manage your admin dashboard
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto scrollbar-none text-background">
          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {adminNavigation.map((item, index) => (
              <NavigationItem
                key={index}
                item={item}
                isActive={isPathActive(item.path)}
                isMinimized={false}
                isOpen={item.path === openMenuPath}
                onToggle={() => {
                  handleMenuToggle(item.path);
                }}
                onNavigate={() => {
                  if (!item.hasSubMenu) {
                    setIsOpen(false);
                  }
                }}
              />
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
