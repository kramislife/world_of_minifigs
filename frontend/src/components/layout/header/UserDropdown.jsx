import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { useLazyLogoutQuery } from "@/redux/api/authApi";
import { userMenuItems } from "@/constant/navigation";

const UserDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [logout, { data, isError, error, isSuccess }] = useLazyLogoutQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "An error occurred during logout");
    }

    if (isSuccess) {
      toast.success(data?.message || "Logout successful", {
        autoClose: 1000,
        onOpen: () => {
          navigate(0);
        },
      });
    }
  }, [isError, error, isSuccess, data, navigate]);

  // Filter menu items based on user role
  const filteredMenuItems = userMenuItems.filter(
    (item) =>
      !item.roleRequired ||
      (Array.isArray(item.roleRequired) &&
        item.roleRequired.includes(user.role))
  );

  // Check if menu item is active by comparing base paths without query parameters
  const isActive = (path) => {
    const basePath = path.split("?")[0]; // Remove query parameters
    const currentPath = location.pathname;
    return currentPath.startsWith(basePath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
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
      </DropdownMenuTrigger>

      <DropdownMenuContent className="text-background mr-5 mt-1">
        {/* User Name and Email */}
        <DropdownMenuLabel className="flex items-center space-x-3 border-b border-brand-end/50 pb-3">
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
          <div>
            <p className="text-base font-medium">{user?.name}</p>
            <p className="text-xs text-gray-300">{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        {/* Menu Items */}
        <div className="flex flex-col gap-2 py-1 border-b border-brand-end/50">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <DropdownMenuItem
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`${
                  active ? "bg-accent text-foreground font-medium" : ""
                }`}
              >
                <Icon
                  className={`mr-2 h-4 w-4 ${active ? "text-foreground" : ""}`}
                />
                <span>{item.label}</span>
              </DropdownMenuItem>
            );
          })}
        </div>

        {/* Logout */}
        <DropdownMenuItem
          className="text-red-500 mt-1"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
