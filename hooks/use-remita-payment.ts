import { useEffect } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    RmPaymentEngine: any;
  }
}

interface UseRemitaPaymentProps {
  onSuccess?: (response: any) => void;
  onError?: (response: any) => void;
}

export const useRemitaPayment = ({
  onSuccess,
  onError,
}: UseRemitaPaymentProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://demo.remita.net/payment/v1/remita-pay-inline.bundle.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const triggerPayment = (rrr: any, amount: any) => {
    if (!rrr) {
      toast.error("RRR is missing. Cannot proceed with payment.");
      return;
    }

    if (!window.RmPaymentEngine) {
      toast.error("Payment engine not loaded. Please try again.");
      return;
    }

    const paymentEngine = window.RmPaymentEngine.init({
      key: "QzAwMDAyNzEyNTl8MTEwNjE4NjF8OWZjOWYwNmMyZDk3MDRhYWM3YThiOThlNTNjZTE3ZjYxOTY5NDdmZWE1YzU3NDc0ZjE2ZDZjNTg1YWYxNWY3NWM4ZjMzNzZhNjNhZWZlOWQwNmJhNTFkMjIxYTRiMjYzZDkzNGQ3NTUxNDIxYWNlOGY4ZWEyODY3ZjlhNGUwYTY=",
      processRrr: true,
      amount: amount,
      transactionId: Math.floor(Math.random() * 1101233),
      extendedData: {
        customFields: [{ name: "rrr", value: rrr }],
      },
      onSuccess: (response: any) => {
        console.log("Payment Successful:", response);
        toast.success("Payment successful!");
        onSuccess?.(response);
      },
      onError: (response: any) => {
        console.error("Payment Failed:", response);
        toast.error("Payment failed. Please try again.");
        onError?.(response);
      },
      onClose: () => {
        console.log("Payment Widget Closed");
      },
    });

    paymentEngine.showPaymentWidget();
  };

  return { triggerPayment };
};
