'use client'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { LawyerComponent } from "@/components/onboarding/signup/lawyer";

const LawyerOrIndividual = () => {
  const router = useRouter();

  // useEffect(() => {
  //   if (router.pathname.includes("/lawyer")) {
  //     router.push("/signup/2");
  //   }
  // }, [router]);

  if (router.pathname.includes("/lawyer")) {
    return <LawyerComponent />;
  } else {
    return  router.push("/signup/1");  }
};

export default LawyerOrIndividual;
