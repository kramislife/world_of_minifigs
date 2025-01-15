import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "@/assets/logo.png";

import SearchSheet from "./components/SearchSheet";
import CartButton from "./components/CartButton";
import DesktopNavbar from "./components/DesktopNavbar";
import MobileMenu from "./components/MobileMenu";
import UserDropdown from "./components/UserDropdown";
import { User } from "lucide-react";
import CartSheet from "./components/CartSheet";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { cartItems = [] } = useSelector((state) => state.cart);
  const [prevCartCount, setPrevCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate total unique items instead of total quantity
  const totalItems = cartItems.length;

  // Track cart changes for animation
  useEffect(() => {
    setPrevCartCount(totalItems);
  }, [totalItems]);

  // Check if items were just added
  const isItemAdded = totalItems > prevCartCount;

  return (
    <nav className="bg-brand-gradient fixed w-full top-0 z-50 py-3">
      <div className="mx-auto flex items-center justify-between px-6">
        <div className="flex items-center flex-shrink-0">
          {/* Logo */}
          <NavLink to="/">
            <img className="h-16 w-auto scale-110" src={logo} alt="logo" />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <DesktopNavbar />

        {/* Search and Cart */}
        <div className="flex items-center space-x-6">
          <div className="z-[100]">
            <SearchSheet
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <CartButton
            itemCount={totalItems}
            showAnimation={isItemAdded}
            onClick={() => setIsCartOpen(true)}
          />

          {/* User Dropdown */}
          <div className="relative hidden md:block z-[100]">
            {user ? (
              <UserDropdown />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-white hover:text-gray-200"
              >
                <User size={24} />
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="z-[100]">
            <MobileMenu user={user} />
          </div>
        </div>
      </div>

      {/* Cart Sheet*/}
      <CartSheet isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </nav>
  );
};

export default Header;
