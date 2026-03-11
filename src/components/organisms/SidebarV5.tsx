import { Sidebar } from "@hubtel/react-ui/sidebar";
import React from "react";

export interface SidebarV5Props extends Partial<
  React.ComponentProps<typeof Sidebar>
> {
  menu?: any;
  sidebarFooter?: any;
  sidebarHeader?: any;
  indentedSidebar?: boolean;
  sidebarMenuItemClassName?: string;
  sidebarGroupLabelClassName?: string;
  menuactiveClassName?: string;
  sidebarClassName?: string;
 
}

export default function SidebarV5(props: SidebarV5Props) {
  return (
    <Sidebar
      indentedSidebar={props.indentedSidebar}
      menu={props.menu}
      menuactiveClassName={props.menuactiveClassName}
      sidebarClassName={props.sidebarClassName}
      sidebarFooter={props.sidebarFooter}
      sidebarGroupLabelClassName={props.sidebarGroupLabelClassName}
      sidebarHeader={props.sidebarHeader}
      sidebarMenuItemClassName={props.sidebarMenuItemClassName}
    />
  );
}
