"use client";
import { useEffect, useState } from "react";
import { Icons } from "@/components/svg/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/hooks/redux";
import { getInitials } from "@/constants";
import { getVerification } from "@/lib/actions/admin-file";

interface Verification {
  id: string;
  user_id: string;
  id_number: string;
  title?: string;
  image: string;
  image_thumbnail: string;
  status: string;
  comment: string;
  created_at: string;
  updated_at: string;
}

export default function ProfileForm() {
  const { data: user } = useAppSelector((state) => state.profile);
  const [verification, setVerification] = useState<Verification | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (user?.first_name && user?.last_name) {
      setName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  useEffect(() => {
    const fetchVerification = async () => {
      setLoading(true);
      try {
        const response = await getVerification();
        if (response.success && response.data) {
          setVerification(response.data);
        } else {
          throw new Error(response.message || "Failed to fetch verification.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchVerification();
  }, []);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Photo uploaded:", file.name);
      // TODO: Implement file upload logic
    }
  };

  const getVerificationLabel = (title?: string) => {
    if (title?.toLowerCase() === "nin") return "NATIONAL IDENTITY NUMBER (NIN)";
    if (title?.toLowerCase() === "scn") return "SUPREME COURT NUMBER (SCN)";
    return "VERIFICATION ID";
  };

  return (
    <div className="mx-auto p-6">
      <h2 className="text-xl font-semibold mb-6">Profile</h2>

      {loading && <p className="text-sm text-neutral-500 mb-4">Loading...</p>}
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {!loading && (
        <div className="bg-white space-y-4 rounded-lg">
          <div className="flex flex-col items-center border-neutral-100 border-2 py-6">
            <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-semibold mb-3">
              {getInitials(name)}
            </div>

            <div className="relative">
              <Button variant="ghost" size="sm" className="text-xs font-medium">
                UPLOAD PHOTO
              </Button>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-10">
                <div className="space-y-1">
                  <Label variant="underline" required htmlFor="verification_id">
                    {getVerificationLabel(verification?.title)}
                  </Label>
                  <div className="relative">
                    <Input
                      id="verification_id"
                      variant="underlined"
                      value={verification?.id_number || ""}
                      className="pr-10 text-sm"
                      disabled
                    />
                    <Icons.verified className="absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <p className="text-xs font-semibold text-primary">
                    {verification?.status || "No Status"}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label variant="underline" required htmlFor="email">
                      EMAIL ADDRESS
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      variant="underlined"
                      value={user?.email || ""}
                      className="text-sm"
                      disabled
                    />
                  </div>

                  <div>
                    <Label variant="underline" required htmlFor="phone">
                      PHONE NUMBER
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      variant="underlined"
                      value={user?.phone_number || ""}
                      className="text-sm"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-primary text-xs text-white">
              UPDATE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
