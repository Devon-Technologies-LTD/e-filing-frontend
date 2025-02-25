"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { getSession } from "@/lib/getSession";
import { setProfile } from "@/redux/slices/profile-slice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    getSession().then((userData) => {
      if (userData && userData.role) {
        dispatch(setProfile(userData));
      }
    });
  }, []);
  return (
    <div data-wrapper="" className="border-grid flex flex-1 h-dvh flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col min-h-[calc(100dvh - 10rem)] max-h-[calc(100dvh - 10rem)] overflow-scroll">
        {children}
      </main>
    </div>
  );
}
