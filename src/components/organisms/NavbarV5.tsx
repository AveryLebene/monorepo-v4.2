import { NavigationHeader } from "@hubtel/react-ui/navigation-header";

export interface NavbarV5Props {}

export default function NavbarV5(props: NavbarV5Props) {
  return (
    <NavigationHeader
      accounts={[
        {
          avatarImage:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
          email: "linda@hubtel.com",
          id: "1",
          isActive: true,
          name: "Linda Doe",
        },
        {
          avatarImage:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
          email: "james@hubtel.com",
          id: "2",
          name: "James Inc.",
        },
        {
          avatarImage:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
          email: "sarah@hubtel.com",
          id: "3",
          name: "Sarah Corp.",
        },
        {
          avatarImage:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
          email: "tech@hubtel.com",
          id: "4",
          name: "Tech Solutions",
        },
      ]}
      actionButtonOptions={[
        {
          label: "New Project",
          value: "project",
        },
        {
          label: "New Task",
          value: "task",
        },
        {
          label: "New Team",
          value: "team",
        },
      ]}
      breadcrumbs={[
        {
          href: "/",
          text: "Dashboard",
        },
        {
          text: "Projects",
        },
        {
          text: "Page 001",
        },
      ]}
      notificationCount={3}
      onAccountSwitch={function tG() {}}
      onActionButtonClick={function tG() {}}
      onForwardClick={function tG() {}}
      onMenuClick={function tG() {}}
      onNotificationClick={function tG() {}}
      onPreviousClick={function tG() {}}
      showActionButton
      showBackButton
      showForwardButton
    />
  );
}
