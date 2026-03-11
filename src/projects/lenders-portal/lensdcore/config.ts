import type { ProjectConfig } from "@/config/types";

const basePath = "/lendscore/lenders-portal";

export const config: ProjectConfig = {
  name: "Lenders Portal",
  basePath,
  theme: "lenders-portal",
  template: "dashboard",
  branding: {
    logo: `${basePath}/svg/logo.svg`,
    logoLabel: "Deals 2D Car Service",
  },
  iconBasePath: "/lendscore/lenders-portal/nav-icons",
  navItems: [
    {
      label: "Dashboard",
      href: "/lendscore/lenders-portal/",
      icon: "dashboard",
    },
    {
      label: "Find New Report",
      href: "/lendscore/lenders-portal/find-report",
      icon: "find-report",
    },
    {
      label: "Past Reports",
      href: "/lendscore/lenders-portal/credit-report",
      icon: "credit-report",
    },
    {
      label: "Report A Loan",
      href: "/lendscore/lenders-portal/report-borrower",
      icon: "report-borrower",
    },
    {
      label: "New Loan Seekers",
      href: "/lendscore/lenders-portal/request-credit",
      icon: "request-credit",
    },
    {
      label: "New Loans / Debt",
      href: "/lendscore/lenders-portal/bank-uploaded",
      icon: "bank",
    },
    {
      label: "Dishonoured Cheques",
      href: "/lendscore/lenders-portal/upload-data",
      icon: "upload-data",
    },
    {
      label: "Judgement Debt",
      href: "/lendscore/lenders-portal/judgement-debt",
      icon: "judgement",
    },
  ],
  sidebarFooter: [
    {
      label: "Manage",
      href: "/lendscore/lenders-portal/manage",
      icon: "manage",
    },
  ],
  sidebarFooterBorder: true,
  navbarTitle: "Dashboard",
  notificationCount: 5,
  userProfile: {
    name: "James Thompson",
    designation: "Super Administrator",
  },
  profileDropdownActions: [
    {
      label: "Switch business",
      href: "/lendscore/lenders-portal/select-business",
    },
    { label: "Logout", href: "/lendscore/lenders-portal/" },
  ],
};
