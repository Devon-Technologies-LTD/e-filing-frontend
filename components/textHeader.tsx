
import { useAppSelector } from "@/hooks/redux";
import { Icons } from "./svg/icons";
export function TextHeader() {
    const { data: user } = useAppSelector((state) => state.profile);
    return (
        <div className="flex ">
            <div>
                <span className="flex gap-3">
                    <Icons.Court />
                    <p className="text-sm uppercase text-app-primary font-semibold">{user?.court_type}</p>
                </span>
                <p className="text-sm font-medium leading-none">
                    {user?.role?.replaceAll("_", " ")}
                </p>


                <p className="text-xs  leading-none text-bold text-muted-foreground">{user?.court_divison}</p>
            </div>
            {/* <div className="">
                <p className="text-sm font-medium leading-none">{user?.role}</p>
            </div> */}
        </div>
    );
}
