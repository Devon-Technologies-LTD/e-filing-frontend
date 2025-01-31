import { Icons } from "../svg/icons";

export function NotificationIcon({
  type,
  initials,
}: {
  type: Notification["icon"];
  initials?: string;
}) {
  switch (type) {
    case "check":
      return (
        <div className="flex items-center justify-center">
          <Icons.check />
        </div>
      );
    case "scale":
      return (
        <div className="flex items-center justify-center">
          <Icons.justice />
        </div>
      );
    case "initials":
      return (
        <div className="h-10 w-10 rounded-full bg-secondary-foreground text-primary flex items-center justify-center font-semibold">
          {initials}
        </div>
      );
    case "hearings":
      return (
        <div className="flex items-center justify-center">
          <Icons.calender />
        </div>
      );
    default:
      return null;
  }
}
