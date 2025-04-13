import { useEffect } from "react";
import {
  Menu,
  User,
  LogOut,
  Home,
  ShoppingBag,
  Phone,
  Info,
  ArrowRight,
  Package,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { navItems } from "@/constant/navigation";
import { useViewport } from "@/hooks/Common/useViewport";
import { useLazyLogoutQuery } from "@/redux/api/authApi";
import { toast } from "react-toastify";

// Map icons to nav items
const navIcons = {
  home: Home,
  products: ShoppingBag,
  contact: Phone,
  about: Info,
};

const MobileMenu = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useViewport();
  const [logout, { data, isError, error, isSuccess }] = useLazyLogoutQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "An error occurred during logout");
    }

    if (isSuccess) {
      toast.success(data?.message || "Logout successful", {
        autoClose: 1000,
        onOpen: () => {
          setIsOpen(false);
        },
        onClose: () => {
          navigate(0);
        },
      });
    }
  }, [isError, error, isSuccess, data, navigate, setIsOpen]);

  const handleLogout = () => {
    logout();
  };

  // Check if the user is an admin or employee
  const isAdminOrEmployee =
    user && ["admin", "employee", "superAdmin"].includes(user.role);

  // Check if a menu item is active based on current path
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // User-specific menu items
  const userMenuItems = user
    ? [
        ...(isAdminOrEmployee
          ? [
              {
                label: "Dashboard",
                icon: <LayoutDashboard size={20} />,
                onClick: () => {
                  navigate("/admin");
                  setIsOpen(false);
                },
                path: "/admin",
              },
            ]
          : []),
        {
          label: "My Orders",
          icon: <Package size={20} />,
          onClick: () => {
            navigate("/my-orders?status=all");
            setIsOpen(false);
          },
          path: "/my-orders",
        },
        {
          label: "Profile",
          icon: <User size={20} />,
          onClick: () => {
            navigate("/profile");
            setIsOpen(false);
          },
          path: "/profile",
        },
        {
          label: "Settings",
          icon: <Settings size={20} />,
          onClick: () => {
            navigate("/settings");
            setIsOpen(false);
          },
          path: "/settings",
        },
      ]
    : [];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden text-white hover:text-gray-200">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-brand-gradient p-0 z-[1000] bg-brand-start">
        <SheetHeader className="sr-only">
          <SheetTitle>Mobile Menu</SheetTitle>
          <SheetDescription>
            This is the mobile menu. It is used to navigate the website on a
            mobile device.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="px-5 pt-16">
            {user ? (
              <div className="flex items-center gap-3 mb-8 p-4 bg-brand-end/20 rounded-xl border border-brand-end/50">
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                  {user?.profile_picture?.url ? (
                    <img
                      src={user.profile_picture.url}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-accent flex items-center justify-center text-black text-lg font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
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
              <div className="flex items-center gap-3 mb-8 p-4 bg-brand-end/20 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-brand-end flex items-center justify-center">
                  <User size={24} className="text-accent" />
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
            <div className="space-y-2">
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
                          ? "bg-accent text-foreground font-medium"
                          : "text-white hover:bg-brand-dark/50 hover:text-accent"
                      }`
                    }
                  >
                    <IconComponent size={20} />
                    <span className="flex-1 text-left">{item.label}</span>
                  </NavLink>
                );
              })}

              {/* User-specific menu items */}
              {user && userMenuItems.length > 0 && (
                <>
                  <div className="my-3 border-t border-brand-end/50"></div>
                  {userMenuItems.map((item, index) => (
                    <button
                      key={`user-item-${index}`}
                      onClick={item.onClick}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
                        isActive(item.path)
                          ? "bg-accent text-foreground font-medium"
                          : "text-white hover:bg-brand-dark/50 hover:text-accent"
                      }`}
                    >
                      {item.icon}
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="px-6 py-2 border-t border-brand-end/50 mt-auto">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-500 transition-colors duration-200 w-full px-4 py-3 rounded-xl hover:bg-gray-500/10"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex flex-col gap-2 py-5">
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-accent text-black font-medium hover:bg-accent-secondary transition-colors duration-200"
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
