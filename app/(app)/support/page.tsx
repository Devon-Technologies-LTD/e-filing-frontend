// pages/contact.tsx
"use client";

import { SubmitButton } from "@/components/ui/submit-button";
import { useState } from "react";
import React from "react";
import { toast } from "sonner";

export default function ContactSupport() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Sending message...");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Message sent successfully.", { id: toastId });
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Try again.", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact Support</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          rows={5}
        />
        <SubmitButton
          value="Send"
          pendingValue="Processing..."
          className="w-full bg-app-primary hover:bg-app-secondary/90 text-white h-12 rounded mt-2"
        />
      </form>
    </div>
  );
}
