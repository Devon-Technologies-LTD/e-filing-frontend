import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle, Copy, Mail, X } from "lucide-react";
import InputField from "@/components/ui/InputField";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createExemption } from "@/lib/actions/examption";

interface UserInfo {
  name: string;
  profession: string;
  email: string;
  status: string;
}

const ExemptionIDGenerator = () => {
  const [email, setEmail] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [exemptionId, setExemptionId] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Use a useEffect hook to handle the state transition after a successful verification.
  // This prevents a potential render loop and is the standard way to handle side effects in React.
  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 500);
      // Clean up the timer when the component unmounts or dependencies change
      return () => clearTimeout(timer);
    }
  }, [isVerified]);



  const handleVerifyEmail = async (): Promise<void> => {
    if (!email) return;
    setIsVerifying(true);

    try {
      const response = await createExemption(email); // ✅ typed ApiResponse<ExemptionData>
      console.log("Response:", response);

      if (response.success && response.data) {
        setExemptionId(response.data.exemption_code);
        setUserInfo({
          name: response.data.name,
          profession: "",
          email: response.data.email,
          status: response.data.status,
        });
        setIsVerified(true);
      } else {
        console.error("Error:", response.message);
        toast.error("Verification failed", {
          description: response.message,
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Failed to verify email", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };



  const handleCopyId = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(exemptionId);
      setCopied(true);
      toast.success("Exemption ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy ID to clipboard");
    }
  };

  const handleSendToEmail = (): void => {
    // TODO: Implement actual email sending functionality
    toast.success(`Exemption ID ${exemptionId} has been sent to ${email}`);
  };

  const handleReset = (): void => {
    setShowResult(false);
    setIsVerified(false);
    setEmail("");
    setExemptionId("");
    setUserInfo(null);
    setCopied(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm">Generate New Exemption ID</Button>
      </DialogTrigger>
      <DialogContent>
        {showResult ? (
          <Card className="border-none shadow-none">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="space-y-2 text-black">
                <CardTitle className="text-xl">{userInfo?.name}</CardTitle>
                <p className="text-sm text-gray-600">{userInfo?.email}</p>
                <Badge variant="secondary" className="w-fit text-black">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                  {userInfo?.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-2xl font-mono text-black font-bold">{exemptionId}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  className="flex-1 bg-red-800 hover:bg-red-900"
                  onClick={handleSendToEmail}
                >
                  <Mail className="h-4 w-4 mr-2" /> Send to Email
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-orange-400 hover:bg-orange-500 text-white border-orange-400"
                  onClick={handleCopyId}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy ID"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Note: This Code is unique to this email and can't be used by another user
              </p>
            </CardContent>
          </Card>
        ) : isVerified ? (
          <div className="text-center py-8">
            <Loader2 className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-semibold mb-2">Verified Successfully</h2>
          </div>
        ) : isVerifying ? (
          <div className="text-center py-8">
            <Loader2 className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-semibold mb-2">Verifying User</h2>
            <p className="text-gray-600">Please hold while we verify user status</p>
          </div>
        ) : (
          <Card className="border-none shadow-none">
            <CardContent>
              <div className="grid mb-2">
                <span className="text-sm text-black font-bold">Exemption ID Generator</span>
                <span className="text-black text-xs">
                  Generate a unique exemption ID for relevant Department/Body/parastatals
                </span>
              </div>
              <Label className="text-black text-xs">Registered Email Address</Label>
              <InputField
                type="email"
                label=""
                placeholder="Registered Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-0"
                id="email"
                name="email"
              />
              <br />
              <Button
                onClick={handleVerifyEmail}
                disabled={!email || isVerifying}
                className="w-full bg-red-800 hover:bg-red-900"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExemptionIDGenerator;
