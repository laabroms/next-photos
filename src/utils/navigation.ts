import { NavItem } from "@/components/Nav/types";

export const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PHOTOS: "/photos",
  ADMIN: {
    DASHBOARD: "/admin",
    ORDERS: "/admin/orders",
    CATEGORIES: {
      BASE: "/admin/categories",
      NEW: "/admin/categories/new",
      ID: (id: string) => `/admin/categories/${id}`,
      EDIT: (id: string) => `/admin/categories/${id}/edit`,
    },
    PHOTOS: {
      BASE: "/admin/photos",
      NEW: "/admin/photos/new",
      ID: (id: string) => `/admin/photos/${id}`,
      EDIT: (id: string) => `/admin/photos/${id}/edit`,
    },
    CUSTOMERS: "/admin/customers",
  },
};

export const userNavItems: NavItem[] = [
  {
    label: "Home",
    href: PATHS.HOME,
  },
  {
    label: "About",
    href: PATHS.ABOUT,
  },
];

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: PATHS.ADMIN.DASHBOARD,
  },
  {
    label: "Photos",
    href: PATHS.ADMIN.PHOTOS.BASE,
  },
  {
    label: "Categories",
    href: PATHS.ADMIN.CATEGORIES.BASE,
  },
  {
    label: "Customers",
    href: PATHS.ADMIN.CUSTOMERS,
  },
  {
    label: "Orders",
    href: PATHS.ADMIN.ORDERS,
  },
];
