import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const NavigationItem = ({ item, isActive, isMinimized }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const location = useLocation();

  // Check if any submenu item is active
  const isSubItemActive = (path) => location.pathname.startsWith(path);

  // Auto-expand submenu if a sub-item is active
  useEffect(() => {
    if (
      item.hasSubMenu &&
      item.subMenu?.some((subItem) => isSubItemActive(subItem.path))
    ) {
      setIsSubMenuOpen(true);
    }
  }, [location.pathname, item]);

  // Icon Classes
  const iconClasses = `
    w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity
    ${isActive ? "opacity-100" : ""}
  `;

  // This is the submenu of the parent item
  const subMenuItemClasses = (isSubActive) => `
    flex items-center transition-all duration-200 group
    ${isMinimized ? "p-3 rounded-lg" : "gap-3 px-4 py-2 rounded-lg w-full"}
    ${
      isSubActive
        ? "bg-accent text-foreground font-medium"
        : "text-md hover:bg-accent hover:text-black"
    }
  `;

  // This is the parent item when it is active
  if (item.hasSubMenu) {
    return (
      <div className={`w-full ${isMinimized ? "flex justify-center" : ""}`}>
        <button
          onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          className={`
            flex items-center transition-all duration-200 w-full
            ${isMinimized ? "justify-center p-3" : "gap-5 px-4 py-3 pr-2"}
            ${
              isActive
                ? "text-white font-medium"
                : "text-md hover:bg-accent hover:text-foreground rounded-lg font-medium"
            }
          `}
        >
          {item.icon && <item.icon className={iconClasses} />}
          {!isMinimized && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {isSubMenuOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </>
          )}
        </button>

        {/* Submenu */}
        {!isMinimized && isSubMenuOpen && (
          <div className="ml-9 mt-1 space-y-3 border-l border-accent/30 pl-2">
            {item.subMenu.map((subItem, index) => {
              const isSubActive = isSubItemActive(subItem.path);
              return (
                <Link
                  key={index}
                  to={subItem.path}
                  className={subMenuItemClasses(isSubActive)}
                >
                  {subItem.icon && (
                    <subItem.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                  )}
                  <span className="text-sm">{subItem.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      title={item.label}
      className={`
        flex items-center transition-all duration-200 group
        ${isMinimized ? "p-3 rounded-lg" : "gap-5 px-4 py-3 rounded-lg w-full"}
        ${
          isActive
            ? "bg-accent text-black"
            : "text-md hover:bg-accent hover:text-foreground"
        }
      `}
    >
      <item.icon className={iconClasses} />
      {!isMinimized && <span className="font-medium">{item.label}</span>}
    </Link>
  );
};

export default NavigationItem;
