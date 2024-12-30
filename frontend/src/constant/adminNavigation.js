import {
  LayoutDashboard,
  Package,
  PackagePlus,
  ShoppingCart,
  Users,
  Star,
  ChartColumnStacked,
  FolderKanban,
  Gauge,
  Pencil,
  Palette,
} from "lucide-react";

export const adminNavigation = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: Package,
    label: "Products",
    path: "/admin/products",
  },
  {
    icon: Palette,
    label: "Product Colors",
    path: "/admin/colors",
  },
  {
    icon: ChartColumnStacked,
    label: "Categories",
    path: "/admin/categories",
  },
  {
    icon: FolderKanban,
    label: "Collections",
    path: "/admin/collections",
  },
  {
    icon: Gauge,
    label: "Skill Levels",
    path: "/admin/skill-levels",
  },
  {
    icon: Pencil,
    label: "Designers",
    path: "/admin/designers",
  },
  {
    icon: ShoppingCart,
    label: "Orders",
    path: "/admin/orders",
  },
  {
    icon: Users,
    label: "Users",
    path: "/admin/users",
  },
  {
    icon: Star,
    label: "Reviews",
    path: "/admin/reviews",
  },
  // {
  //   icon: PackagePlus,
  //   label: "New Product",
  //   path: "",
  // },
];
