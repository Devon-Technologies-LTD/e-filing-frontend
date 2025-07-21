import { useState } from "react";

export function useFormState() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return {
    isSubmitting,
    setIsSubmitting,
  };
}
