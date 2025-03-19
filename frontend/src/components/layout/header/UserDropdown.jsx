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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [logout, { data, isError, error, isSuccess }] =
    useLazyLogoutQuery();

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

  const menuItems = [
    ...(isAdminOrEmployee
      ? [
          {
            label: "Dashboard",
            icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
            onClick: () => navigate("/admin"),
          },
        ]
      : []),
    {
      label: "My Orders",
      icon: <Package className="mr-2 h-4 w-4" />,
      onClick: () => navigate("/my-orders?status=all"),
    },
    {
      label: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
      onClick: () => navigate("/profile"),
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="w-8 h-8 rounded-full  overflow-hidden flex items-center justify-center">
          {user?.profile_picture?.url ? (
            <img
              src={user.profile_picture.url}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-60 mt-2 mr-3 bg-darkBrand border-gray-800 text-white z-[1001]"
        sideOffset={5}
        align="end"
        forceMount
        style={{ position: "relative", zIndex: 1001 }}
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
                <div className="w-full h-full bg-red-500 flex items-center justify-center text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />

        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer transition-colors"
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
          className="cursor-pointer text-red-500 focus:text-red-500 transition-colors"
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
