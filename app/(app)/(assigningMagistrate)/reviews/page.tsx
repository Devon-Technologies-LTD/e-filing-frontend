import { redirect } from "next/navigation";

export default function CasesPage() {
  redirect("/reviews/under-review");
}
