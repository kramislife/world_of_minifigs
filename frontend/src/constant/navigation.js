// Navigation items

export const navItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/',
      },
      {
        id: 'products',
        label: 'Product',
        path: '/products',
      },
      {
        id: 'contact',
        label: 'Contact',
        path: '/contact',
      },
      {
        id: 'about',
        label: 'About',
        path: '/about',
        // isExternalLink: true, // For using <a> instead of <Link>
      },
]

// Dropdown items

export const dropdownItems = [
    {
      id: 'profile',
      label: 'Profile',
      path: '/me/profile',
    },
    {
      id: 'admin',
      label: 'Admin',
      path: '/admin/dashboard',
      roleRequired: 'admin',
    },
    {
      id: 'logout',
      label: 'Logout',
      action: 'logout', // Special identifier for logout action
    },
  ];
