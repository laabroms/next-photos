import { NavItem } from "@/components/Nav/types";

export const ROUTES = {
  HOME: {
    PATH: "/",
  },
  ABOUT: {
    PATH: "/about",
  },
  CONTACT: {
    PATH: "/contact",
  },
  PHOTOS: {
    PATH: "/photos",
  },
  CATEGORY: {
    PATH: `/[name]`,
    LINK: (name: string) => `/${name}`,
  },
  ADMIN: {
    DASHBOARD: {
      PATH: "/admin",
    },
    ORDERS: {
      PATH: "/admin/orders",
    },
    CATEGORIES: {
      BASE: {
        PATH: "/admin/categories",
      },
      NEW: {
        PATH: "/admin/categories/new",
      },
      ID: {
        PATH: `/admin/categories/[id]`,
        LINK: (id: string) => `/admin/categories/${id}`,
      },
      EDIT: {
        PATH: `/admin/categories/[id]/edit`,
        LINK: (id: string) => `/admin/categories/${id}/edit`,
      },
    },
    PHOTOS: {
      BASE: {
        PATH: "/admin/photos",
      },
      NEW: {
        PATH: "/admin/photos/new",
      },
      ID: {
        PATH: `/admin/photos/[id]`,
        LINK: (id: string) => `/admin/photos/${id}`,
      },
      EDIT: {
        PATH: `/admin/photos/[id]/edit`,
        LINK: (id: string) => `/admin/photos/${id}/edit`,
      },
    },
    CUSTOMERS: {
      PATH: "/admin/customers",
    },
  },
};

export const userNavItems: NavItem[] = [
  {
    label: "Home",
    href: ROUTES.HOME.PATH,
  },
  // {
  //   label: "About",
  //   href: ROUTES.ABOUT.PATH,
  // },
];

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.ADMIN.DASHBOARD.PATH,
  },
  {
    label: "Photos",
    href: ROUTES.ADMIN.PHOTOS.BASE.PATH,
  },
  {
    label: "Categories",
    href: ROUTES.ADMIN.CATEGORIES.BASE.PATH,
  },
];
