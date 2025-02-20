import { redirect } from "next/navigation";

export default function DetailsPage({ params }: { params: { id: string } }) {
  redirect(`/reviews/details/under-review`);
}
