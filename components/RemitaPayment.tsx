import { useState, useEffect } from "react";

declare global {
  interface Window {
    RmPaymentEngine: any;
  }
}

const RemitaPayment = () => {
  const [rrr, setRrr] = useState("");

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

  const makePayment = () => {
    if (!rrr) {
      alert("Please enter a valid RRR.");
      return;
    }

    const paymentEngine = window.RmPaymentEngine.init({
      key: "QzAwMDAyNzEyNTl8MTEwNjE4NjF8OWZjOWYwNmMyZDk3MDRhYWM3YThiOThlNTNjZTE3ZjYxOTY5NDdmZWE1YzU3NDc0ZjE2ZDZjNTg1YWYxNWY3NWM4ZjMzNzZhNjNhZWZlOWQwNmJhNTFkMjIxYTRiMjYzZDkzNGQ3NTUxNDIxYWNlOGY4ZWEyODY3ZjlhNGUwYTY=",
      processRrr: true,
      transactionId: Math.floor(Math.random() * 1101233),
      extendedData: {
        customFields: [
          {
            name: "rrr",
            value: rrr,
          },
        ],
      },
      onSuccess: (response: any) => {
        console.log(response)
      },
      onError: (response: any) => {
        console.error("Payment Failed:", response);
      },
      onClose: () => {
        console.log("Payment Widget Closed");
      },
    });

    paymentEngine.showPaymentWidget();
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} id="payment-form">
        <div className="mb-3 mt-3">
          <label htmlFor="rrr">Enter RRR</label>
          <input
            type="text"
            className="form-control"
            id="rrr"
            name="rrr"
            placeholder="Enter RRR"
            value={rrr}
            onChange={(e) => setRrr(e.target.value)}
          />
        </div>
        <p>
          <strong>Note:</strong> To generate an RRR:
        </p>
        <ul>
          <li>
            <a
              href="https://api.remita.net/#ed5722a2-4bf3-40a0-99c5-37f94cb94a55"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here
            </a>{" "}
            to utilize our Invoice Generation API.
          </li>
          <li>
            <a
              href="https://demo.remita.net/remita/onepage/QATEST/biller.spa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here
            </a>{" "}
            to generate a Bill and use the 'Bank Branch' Payment option to get
            the RRR.
          </li>
        </ul>
        <button type="button" onClick={makePayment} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RemitaPayment;
