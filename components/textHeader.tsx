
import { useAppSelector } from "@/hooks/redux";
import { Icons } from "./svg/icons";
export function TextHeader() {
    const { data: user } = useAppSelector((state) => state.profile);
    console.log(user);
    return (
        <div className="flex ">
            <div>
                <div className="flex flex-col gap-2">
                    {user?.court_type !== "" && user?.court_type !== null && (
                        <span className="flex gap-3">
                            <Icons.Court />
                            <p className="text-sm uppercase text-app-primary font-semibold">{user?.court_type}</p>
                        </span>
                    )}
                    <p className="text-sm font-medium leading-none">
                        {user?.role?.replaceAll("_", " ")}
                    </p>
                </div>
                <p className="text-xs  leading-none text-bold text-muted-foreground">{user?.court_divison}</p>
            </div>
            {/* <div className="">
                <p className="text-sm font-medium leading-none">{user?.role}</p>
            </div> */}
        </div>
    );
}
