import React from "react";
import BrandLogo from "@/components/atoms/BrandLogo";
import type {
  FooterNavItem,
  NavItem,
  ProjectBranding,
} from "@/config/types";
import { getNavWithActive } from "@/config/utils";

function isProjectBranding(b: unknown): b is ProjectBranding {
  return typeof b === "object" && b !== null && "logo" in b;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  navItems: NavItem[];
  pathname: string;
  branding?: ProjectBranding | React.ReactNode;
  footer?: string | FooterNavItem[] | null;
  footerBorder?: boolean;
  iconBasePath?: string;
}

export default function Sidebar({
  isOpen,
  onClose,
  navItems,
  pathname,
  branding,
  footer,
  footerBorder,
  iconBasePath,
}: Readonly<SidebarProps>) {
  const items = getNavWithActive(navItems, pathname);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static h-dvh top-0 left-0 z-40 shrink-0 flex flex-col transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          width: "var(--sidebar-width, 220px)",
          backgroundColor: "var(--sidebar-bg)",
          color: "var(--sidebar-text)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center justify-center px-4 py-5">
          {isProjectBranding(branding) ? (
            <BrandLogo
              imgSrc={branding.logo}
              label={branding.logoLabel}
              width={branding.logoWidth ?? 56}
              height={branding.logoHeight ?? 56}
            />
          ) : (
            branding
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5 px-3 overflow-y-auto">
          {items.map(
            ({ label, href, icon, active, badgeCount, badgeColor }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2.5 px-3 py-3.5 rounded-sm no-underline transition-colors"
                style={{
                  backgroundColor: active
                    ? "var(--sidebar-active-bg)"
                    : "transparent",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.75)",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: "1.3",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor =
                      "var(--sidebar-hover-bg)";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                  }
                }}
              >
                {icon && iconBasePath && (
                  <img
                    src={`${iconBasePath}/${icon}.svg`}
                    alt=""
                    width={18}
                    height={18}
                    className="shrink-0 opacity-80"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                )}
                <span className="whitespace-nowrap">{label}</span>
                {badgeCount !== undefined && (
                  <span
                    className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full leading-none"
                    style={{
                      backgroundColor:
                        badgeColor ?? "var(--sidebar-badge-bg, #dc2626)",
                      color: "var(--sidebar-badge-text, #ffffff)",
                    }}
                  >
                    {badgeCount}
                  </span>
                )}
              </a>
            ),
          )}
        </nav>

        {/* Footer */}
        {footer != null &&
          (typeof footer === "string" ? footer !== "" : footer.length > 0) && (
            <div
              className="px-3 py-3"
              style={
                footerBorder === false
                  ? undefined
                  : { borderTop: "1px solid var(--sidebar-border)" }
              }
            >
              {typeof footer === "string" ? (
                <p className="text-xs opacity-60 px-3">{footer}</p>
              ) : (
                <nav className="flex flex-col gap-0.5">
                  {footer.map((item) => {
                    const isFooterActive = pathname === item.href;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 px-3 py-3 rounded-sm no-underline transition-colors"
                        style={{
                          backgroundColor: isFooterActive
                            ? "var(--sidebar-active-bg)"
                            : "transparent",
                          color: isFooterActive
                            ? "#ffffff"
                            : "rgba(255,255,255,0.75)",
                          fontSize: "13px",
                          fontWeight: 400,
                        }}
                        onMouseEnter={(e) => {
                          if (!isFooterActive) {
                            e.currentTarget.style.backgroundColor =
                              "var(--sidebar-hover-bg)";
                            e.currentTarget.style.color = "#ffffff";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isFooterActive) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color =
                              "rgba(255,255,255,0.75)";
                          }
                        }}
                      >
                        {item.icon && iconBasePath && (
                          <img
                            src={`${iconBasePath}/${item.icon}.svg`}
                            alt=""
                            width={18}
                            height={18}
                            className="shrink-0 opacity-80"
                            style={{ filter: "brightness(0) invert(1)" }}
                          />
                        )}
                        <span className="whitespace-nowrap">{item.label}</span>
                      </a>
                    );
                  })}
                </nav>
              )}
            </div>
          )}
      </aside>
    </>
  );
}
