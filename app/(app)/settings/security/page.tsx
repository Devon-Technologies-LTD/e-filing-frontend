"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import { Icons } from "@/components/svg/icons";

export default function AccountSecurity() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);

  return (
    <div className="mx-auto p-6">
      <h2 className="text-lg font-bold mb-6">Account and Security</h2>

      <div className="space-y-12">
        {/* Change Password Section */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-neutral-800">
              Change Password
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="new-password" variant={"underline"}>
                  NEW PASSWORD
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Password"
                    variant="underlined"
                    className="text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <Icons.eyeslash className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="current-password" variant={"underline"}>
                  CURRENT PASSWORD
                </Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Password"
                    variant="underlined"
                    className="text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <Icons.eyeslash className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button size={"lg"} className="bg-primary text-xs text-white">
            UPDATE
          </Button>
        </div>

        {/* 2 Factor Authentication Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-neutral-800">
            2 Factor Authentication
          </h3>
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="question1" variant={"underline"}>
                  QUESTION 1
                </Label>
                <Input
                  id="question1"
                  placeholder="e.g What is your favorite drink?"
                  variant="underlined"
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="answer1" variant={"underline"}>
                  ANSWER
                </Label>
                <div className="relative">
                  <Input
                    id="answer1"
                    type={showAnswer1 ? "text" : "password"}
                    placeholder="Password"
                    variant="underlined"
                    className="text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setShowAnswer1(!showAnswer1)}
                  >
                    {showAnswer1 ? (
                      <Icons.eyeslash className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="question2" variant={"underline"}>
                  QUESTION 2
                </Label>
                <Input
                  id="question2"
                  placeholder="e.g What is your favorite drink?"
                  variant="underlined"
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="answer2" variant={"underline"}>
                  ANSWER
                </Label>
                <div className="relative">
                  <Input
                    id="answer2"
                    type={showAnswer2 ? "text" : "password"}
                    placeholder="Password"
                    variant="underlined"
                    className="text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setShowAnswer2(!showAnswer2)}
                  >
                    {showAnswer2 ? (
                      <Icons.eyeslash className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
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
