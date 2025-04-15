import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const NavigationItem = ({
  item,
  isActive,
  isMinimized,
  isOpen,
  onToggle,
  onNavigate,
}) => {
  const location = useLocation();

  // Check if any submenu item is active
  const isSubItemActive = (path) => location.pathname.startsWith(path);

  // Modify the useEffect to only run once on mount
  useEffect(() => {
    if (
      item.hasSubMenu &&
      item.subMenu?.some((subItem) => isSubItemActive(subItem.path)) &&
      !isOpen // Only open if it's not already open
    ) {
      onToggle();
    }
  }, []); // Empty dependency array - only runs on mount

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
          onClick={onToggle}
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
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </>
          )}
        </button>

        {/* Submenu */}
        {!isMinimized && (
          <div
            className={`
              ml-9 overflow-hidden transition-all duration-200
              ${isOpen ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"}
            `}
          >
            <div className="mt-1 space-y-3 border-l border-gray-700 pl-2">
              {item.subMenu.map((subItem, index) => {
                const isSubActive = isSubItemActive(subItem.path);
                return (
                  <Link
                    key={index}
                    to={subItem.path}
                    className={subMenuItemClasses(isSubActive)}
                    onClick={() => onNavigate?.()}
                  >
                    {subItem.icon && (
                      <subItem.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    )}
                    <span className="text-sm">{subItem.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      title={item.label}
      onClick={() => onNavigate?.()}
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
