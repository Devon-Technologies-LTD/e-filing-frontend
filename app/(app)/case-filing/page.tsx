import { CaseForm } from "@/components/case-filing/case-form";
import { getCaseTypes } from "@/lib/actions/public";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function CaseFilingPage() {
   const queryClient = new QueryClient();
   await queryClient.prefetchQuery({
     queryKey: ["case_types"],
     queryFn: getCaseTypes,
   });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CaseForm />
    </HydrationBoundary>
  ); 
}