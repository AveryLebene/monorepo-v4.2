import type { ProjectConfig, ProjectMeta } from "@/config/types";

const basePath = "/projects/lendscore/lenders-portal";

export const meta: ProjectMeta = {
  id: "lenders-portal",
  group: "lendscore",
  description:
    "Pull credit reports, log loans, manage borrowers and dishonoured cheques.",
  tags: ["Dashboard", "Reports"],
  href: "/projects/lendscore/",
};

export const config: ProjectConfig = {
  name: "Lendscore",
  basePath,
  theme: "lenders-portal",
  template: "dashboard",
  branding: {
    logo: `${basePath}/svg/logo.svg`,
    logoLabel: "Deals 2D Car Service",
  },
  iconBasePath: "/projects/lendscore/lenders-portal/nav-icons",
  navItems: [
    {
      label: "Dashboard",
      href: "/projects/lendscore/lenders-portal/",
      icon: "dashboard",
    },
    {
      label: "Find New Report",
      href: "/projects/lendscore/lenders-portal/find-report",
      icon: "find-report",
    },
    {
      label: "Past Reports",
      href: "/projects/lendscore/lenders-portal/credit-report",
      icon: "credit-report",
    },
    {
      label: "Report A Loan",
      href: "/projects/lendscore/lenders-portal/report-borrower",
      icon: "report-borrower",
    },
    {
      label: "New Loan Seekers",
      href: "/projects/lendscore/lenders-portal/request-credit",
      icon: "request-credit",
    },
    {
      label: "New Loans / Debt",
      href: "/projects/lendscore/lenders-portal/bank-uploaded",
      icon: "bank",
    },
    {
      label: "Dishonoured Cheques",
      href: "/projects/lendscore/lenders-portal/upload-data",
      icon: "upload-data",
    },
    {
      label: "Judgement Debt",
      href: "/projects/lendscore/lenders-portal/judgement-debt",
      icon: "judgement",
    },
  ],
  sidebarFooter: [
    {
      label: "Manage",
      href: "/projects/lendscore/lenders-portal/manage",
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
      href: "/projects/lendscore/lenders-portal/select-business",
    },
    { label: "Logout", href: "/projects/lendscore/lenders-portal/" },
  ],
};
