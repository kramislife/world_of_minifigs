import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLazyLogoutQuery } from "@/redux/api/authApi";
import { User, LogOut, Settings, LayoutDashboard, Package } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const UserDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [logout, { data, isError, error, isSuccess }] = useLazyLogoutQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "An error occoured during logout");
    }

    if (isSuccess) {
      toast.success(data?.message, {
        autoClose: 1000,
        onOpen: () => {
          navigate(0);
        },
      });
    }
  }, [isError, error, isSuccess, data, navigate]);

  const handleLogout = () => {
    logout();
  };

  // Check if the user is an admin or employee
  const isAdminOrEmployee = ["admin", "employee", "superAdmin"].includes(
    user.role
  );

  // Check if a menu item is active based on current path
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    ...(isAdminOrEmployee
      ? [
          {
            label: "Dashboard",
            icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
            onClick: () => navigate("/admin"),
            path: "/admin",
          },
        ]
      : []),
    {
      label: "My Orders",
      icon: <Package className="mr-2 h-4 w-4" />,
      onClick: () => navigate("/my-orders?status=all"),
      path: "/my-orders",
    },
    {
      label: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      onClick: () => navigate("/settings"),
      path: "/settings",
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
          {user?.profile_picture?.url ? (
            <img
              src={user.profile_picture.url}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Button variant="accent">
              {user?.name?.charAt(0).toUpperCase()}
            </Button>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="text-white w-60 mt-2 mr-3 bg-brand-start border border-brand-end z-[1001] shadow-lg"
        sideOffset={5}
        align="end"
        forceMount
        style={{
          position: "relative",
          zIndex: 1001,
        }}
      >
        {/* User Name and Email */}
        <DropdownMenuLabel>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              {user?.profile_picture?.url ? (
                <img
                  src={user.profile_picture.url}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Button variant="accent">
                  {user?.name?.charAt(0).toUpperCase()}
                </Button>
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-300">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />

        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className={`cursor-pointer transition-colors ${
                isActive(item.path)
                  ? "bg-accent text-black"
                  : "hover:text-black"
              }`}
              onClick={item.onClick}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="bg-gray-600" />

        {/* Logout */}
        <DropdownMenuItem
          className="cursor-pointer text-red-500 focus:text-red-500 hover:bg-gray-700 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4 " />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
