import { useAppSelector } from "@/hooks/redux";
import { Icons } from "./svg/icons";

export function TextHeader() {
  const { data: user } = useAppSelector((state) => state.profile);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex flex-col gap-1 text-start">
        {user?.court_type !== "" && user?.court_type !== null && (
          <div className="flex items-center gap-2 flex-wrap">
            <Icons.Court className="w-4 h-4 shrink-0" />
            <p className="text-xs uppercase text-app-primary font-semibold truncate max-w-[200px] sm:max-w-none">
              {user?.court_type}
            </p>
          </div>
        )}

        <p className="text-xs font-medium leading-none break-words">
          {user?.role?.replaceAll("_", " ")}
        </p>
        <p className="text-xs text-muted-foreground font-bold truncate max-w-[200px] sm:max-w-none">
          {user?.court_divison}
        </p>
      </div>
    </div>
  );
}
