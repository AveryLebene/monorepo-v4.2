import type { ProjectConfig } from "../../config/types";

export const config: ProjectConfig = {
  name: "MA Portal",
  basePath: "/ma-portal",
  theme: "ma-portal",

  template: "dashboard",
  branding: {
    logo: "https://designs.hubtel.com/v4/assets/images/rethink.png",
    logoLabel: "MA Portal",
  },
  navItems: [
    { label: "Dashboard", href: "/ma-portal/" },
    { label: "Notifications", href: "/ma-portal/notifications", badgeCount: 3 },
    { label: "Settings", href: "/ma-portal/settings" },
    { label: "Profile", href: "/ma-portal/profile" },
    { label: "Help", href: "/ma-portal/help" },
    { label: "Logout", href: "/ma-portal/logout" },
  ],
  navbarTitle: "Dashboard",
  notificationCount: 5,
  userProfile: {
    name: "James Thompson",
    designation: "Super Administrator",
  },
  profileDropdownActions: [{ label: "Logout", href: "/ma-portal/logout" }],
  sidebarType: "v5",
  navbarType: "v5",
  v5NavbarProps: {},
  v5SidebarProps: {
    menu: [
      {
        children: [
          {
            title: "Dashboard",
            url: "/ma-portal/",
            isActive: true,
          },
          {
            children: [
              {
                title: "Enrollment",
                url: "",
              },
              {
                title: "Attendance",
                url: "",
              },
            ],
            title: "Menu Item 2",
            url: "",
          },
          {
       
            title: "Menu Item 3",
            url: "",
          },
          {
            title: "Menu Item 4",
            url: "",
          },
        ],
        sectionLabel: "SECTION TITLE",
      },
      {
        children: [
          {
            title: "Settings",
            url: "",
          },
          {
            title: "Reports",
            url: "",
          },
        ],
        sectionLabel: "SECTION TITLE",
      },
    ],
    sidebarFooter: {
      align: "center",
      list: [
        {
          title: "Footer item 1",
          url: "",
        },
        {
          title: "Footer item 2",
          url: "",
        },
      ],
      variant: "list",
    },
    sidebarHeader: {
  
      dropdownClassName: "text-white bg-black/20",
      dropdownOptions: {
        options: [
          {
            label: "Adenta",
            value: "adenta",
          },
          {
            label: "Accra",
            value: "accra",
          },
        ],
      },
      dropdownPlaceholder: "All Branches",
      hasDropdown: true,
      headerClassName: "text-white",
      image: "/rethink.png",
      onDropdownChange: function tG() {},
      title: "Rethink Enterprise",
      variant: "stacked",
    },
    sidebarMenuItemClassName: "text-white py-2 hover:bg-black/5 rounded-sm",
  },
};
