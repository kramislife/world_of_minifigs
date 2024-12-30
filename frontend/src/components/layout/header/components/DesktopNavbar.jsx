import { NavLink } from "react-router-dom";
import { navItems } from "@/constant/navigation";

const DesktopNav = () => {
  return (
    <ul className="hidden md:flex items-center space-x-12 text-md">
      {navItems.map((item) => (
        <li key={item.id}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-medium underline underline-offset-8"
                : "text-light hover:text-gray-300 transition-colors duration-200"
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default DesktopNav;
