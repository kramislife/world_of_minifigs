import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen } from "@/redux/features/userSlice";
import SearchSheet from "./SearchSheet";
import CartButton from "./CartButton";
import DesktopNavbar from "./components/DesktopNavbar";
import MobileMenu from "./components/MobileMenu";
import UserDropdown from "./UserDropdown";
import { User } from "lucide-react";
import logo from "@/assets/worldofminifigs.png";
import CartSheet from "./CartSheet";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { cartItems = [] } = useSelector((state) => state.cart);
  const [prevCartCount, setPrevCartCount] = useState(0);
  const { isCartOpen } = useSelector((state) => state.auth);

  // Calculate total unique items instead of total quantity
  const totalItems = cartItems.length;

  // Track cart changes for animation
  useEffect(() => {
    setPrevCartCount(totalItems);
  }, [totalItems]);

  // Check if items were just added
  const isItemAdded = totalItems > prevCartCount;

  return (
    <nav className="bg-brand-start fixed w-full top-0 z-50 border-b border-brand-end/50">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between h-[85px] p-6">
          <div className="flex items-center flex-shrink-0">
            {/* Logo */}
            <NavLink to="/">
              <img
                className="h-8 md:h-12 w-auto scale-110"
                src={logo}
                alt="logo"
              />
            </NavLink>
          </div>
          {/* Desktop Navigation - adjust spacing */}
          <div className="flex-grow flex justify-center">
            <DesktopNavbar />
          </div>
          {/* Search and Cart */}
          <div className="flex items-center md:space-x-2">
            <div className="flex items-center justify-center w-8">
              <SearchSheet
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <div className="flex items-center justify-center h-10 w-10">
              <CartButton
                itemCount={totalItems}
                showAnimation={isItemAdded}
                onClick={() => dispatch(setIsCartOpen(true))}
              />
            </div>

            {/* User Dropdown */}
            <div className="hidden md:flex items-center justify-center h-10 w-10 ">
              {user ? (
                <UserDropdown />
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-gray-200 flex items-center justify-center"
                >
                  <User size={24} />
                </button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center justify-center md:hidden h-10 w-10">
              <MobileMenu user={user} />
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sheet */}
      <CartSheet
        isOpen={isCartOpen}
        setIsOpen={(value) => dispatch(setIsCartOpen(value))}
      />
    </nav>
  );
};

export default Header;
