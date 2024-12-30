import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLazyLogoutQuery } from "@/redux/api/authApi";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDropdown = () => {
  //

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [logout, { data, isError, error, isSuccess, isLoading }] =
    useLazyLogoutQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "An error occoured during logout");
    }

    if (isSuccess) {
      toast.success(data?.message);
      setTimeout(() => {
        navigate(0);
      }, 2000);
    }
  }, [isError, error, isLoading, isSuccess, data]);

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
        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
          {user?.name?.charAt(0).toUpperCase()}
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
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
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
