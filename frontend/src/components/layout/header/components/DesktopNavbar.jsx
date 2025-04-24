import { NavLink } from "react-router-dom";
import { navItems } from "@/constant/navigation";

const DesktopNav = () => {
  return (
    <ul className="hidden md:flex items-center justify-center space-x-12 text-md">
      {navItems.map((item) => (
        <li key={item.id}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "text-accent font-medium decoration-2 underline underline-offset-8"
                : "text-white hover:text-accent transition-colors duration-200"
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
