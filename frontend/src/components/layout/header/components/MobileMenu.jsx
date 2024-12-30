import { useState, useEffect } from "react";
import {
  Menu,
  User,
  LogOut,
  Home,
  ShoppingBag,
  Phone,
  Info,
  ArrowRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NavLink, useNavigate } from "react-router-dom";
import { navItems } from "@/constant/navigation";
import { useViewport } from "@/hooks/useViewport";
import { useSelector } from "react-redux";

// Map icons to nav items
const navIcons = {
  home: Home,
  products: ShoppingBag,
  contact: Phone,
  about: Info,
};

const MobileMenu = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useViewport();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden text-white hover:text-gray-200">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className="w-[300px] bg-brand-gradient p-0 z-[1000]">
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="px-5 pt-16">
            {user ? (
              <div className="flex items-center gap-3 mb-8 p-4 bg-darkBrand/20 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium line-clamp-1">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-400 line-clamp-1">
                    {user.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-8 p-4 bg-darkBrand/20 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <User size={24} className="text-gray-400" />
                </div>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between flex-1 text-white hover:text-gray-200"
                >
                  <span className="font-medium">Sign In</span>
                  <ArrowRight size={20} className="text-gray-400" />
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="px-5 flex-1">
            <div className="space-y-5">
              {navItems.map((item) => {
                const IconComponent = navIcons[item.id.toLowerCase()] || Info;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gray-500/10 text-red-500"
                          : "text-white hover:bg-white/5"
                      }`
                    }
                  >
                    <IconComponent size={20} />
                    <span className="flex-1 text-left">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="px-6 py-6 border-t border-white/10 mt-auto">
            {user ? (
              <button
                onClick=""
                className="flex items-center gap-3 text-red-500 transition-colors duration-200 w-full px-4 py-3 rounded-xl hover:bg-gray-500/10"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl text-white hover:bg-gray-500/10 transition-colors duration-200"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
