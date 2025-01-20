"use client";
import { Icons } from "@/components/svg/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileForm() {
  return (
    <div className=" mx-auto p-6">
      <h2 className="text-xl font-semibold mb-6">Profile</h2>
      <div className="bg-white space-y-4 rounded-lg">
        <div className="flex flex-col items-center border-neutral-100 border-2 py-6">
          <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-semibold mb-3">
            JD
          </div>
          <Button variant="ghost" size="sm" className="text-xs font-medium">
            UPLOAD PHOTO
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-medium text-neutral-500">
              Name Fields from NIN Details Submitted
            </p>

            <div className="space-y-10">
              <div className="space-y-1">
                <Label variant={"underline"} required htmlFor="nin">
                  NATIONAL IDENTITY NUMBER (NIN)
                </Label>
                <div className="relative">
                  <Input
                    id="nin"
                    variant="underlined"
                    value="BA234RT75W"
                    className="pr-10 text-sm"
                  />
                  <Icons.verified className="absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                <p className="text-xs font-semibold text-primary">
                  JANE DOE JANETTINE
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label variant={"underline"} required htmlFor="email">
                    EMAIL ADDRESS
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    variant="underlined"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label variant={"underline"} required htmlFor="phone">
                    PHONE NUMBER
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    variant="underlined"
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <Button size={"lg"} className="bg-primary text-xs text-white">
            UPDATE
          </Button>
        </div>
      </div>
    </div>
  );
}
