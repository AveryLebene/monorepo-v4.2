/**
 * Shared type definitions for project configuration.
 * Every project/sub-project defines a ProjectConfig that drives
 * its layout, theme, navigation, and branding.
 */

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badgeCount?: number;
  /** CSS color for badge (e.g. "#dc2626", "var(--accent)"). Falls back to --sidebar-badge-bg or red. */
  badgeColor?: string;
  children?: NavItem[];
}
/** Alias for NavItem — used for sidebar footer links. Same shape, unified type. */
export type FooterNavItem = NavItem;

export interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
  designation?: string;
  dropdownIcon?: string;
}

/** Action item in navbar dropdown (e.g. Logout). Use href for link or onClick for button. */
export interface NavbarDropdownAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface ProjectBranding {
  logo: string;
  logoLabel?: string;
  logoWidth?: number;
  logoHeight?: number;
}

/**
 * Per-project font families. Applied as CSS variables (--font-heading, --font-body).
 * - string: one font for both header and body
 * - object: optionally different fonts for heading vs body (heading falls back to body if omitted)
 */
export type ProjectFonts =
  | string
  | {
      /** Font for headings (h1–h6). Falls back to body if omitted. */
      heading?: string;
      /** Font for body text. Used site-wide. */
      body?: string;
    };

export type TemplateName = "dashboard" | "fullwidth";

/* ─── Base config shared by all sidebar/navbar variants ─── */
export interface ProjectConfigBase {
  /** Display name of the project */
  name: string;
  /** Base URL path (e.g. "/ma-portal") */
  basePath: string;
  /** Theme key — maps to a [data-theme-astro="..."] selector in tokens.css */
  theme: string;
  /** v5 theme key — maps to a [data-theme="..."] selector in tokens.css */
  v5Theme?: string;
  /** Which template to render: dashboard (sidebar+main), fullwidth (no sidebar) */
  template: TemplateName;
  /** Optional user profile for navbar (name, designation, avatar, etc.) */
  userProfile?: UserProfile;
  /** Optional navbar title; falls back to config.name or page title */
  navbarTitle?: string;
  /** Optional unread notification count (e.g. for bell icon badge) */
  notificationCount?: number;
  /** Actions shown in the profile dropdown (e.g. Logout) */
  profileDropdownActions?: NavbarDropdownAction[];
  /** Per-project font families. Applied as CSS custom properties on the document. */
  fonts?: ProjectFonts;
}

/* ─── Sidebar discriminated union ─── */

/** V4 sidebar — navItems and branding are REQUIRED */
interface SidebarV4Config {
  sidebarType?: "v4";
  /** Navigation items shown in the sidebar */
  navItems: NavItem[];
  /** Logo and branding for sidebar / navbar */
  branding: ProjectBranding;
  /** Base path for nav icon SVGs (e.g. "/lendscore/lenders-portal/nav-icons") */
  iconBasePath?: string;
  /** Optional sidebar footer text; omit or null = no footer */
  sidebarFooter?: string | FooterNavItem[] | null;
  /** When footer is present, show top border (default true) */
  sidebarFooterBorder?: boolean;
  v5SidebarProps?: never;
}

/** V5 sidebar — v5SidebarProps is REQUIRED */
interface SidebarV5Config {
  sidebarType: "v5";
  /** Props specifically for SidebarV5 (menu, sidebarFooter, etc.) */
  v5SidebarProps: Record<string, any>;
  /** Navigation items (optional for v5, some projects may share) */
  navItems?: NavItem[];
  /** Logo and branding (optional for v5) */
  branding?: ProjectBranding;
  iconBasePath?: string;
  sidebarFooter?: string | FooterNavItem[] | null;
  sidebarFooterBorder?: boolean;
}

/* ─── Navbar discriminated union ─── */

interface NavbarV4Config {
  navbarType?: "v4";
  v5NavbarProps?: never;
}

interface NavbarV5Config {
  navbarType: "v5";
  /** Props specifically for NavbarV5 */
  v5NavbarProps: Record<string, any>;
}

/* ─── Final exported union ─── */
export type ProjectConfig = ProjectConfigBase &
  (SidebarV4Config | SidebarV5Config) &
  (NavbarV4Config | NavbarV5Config);
