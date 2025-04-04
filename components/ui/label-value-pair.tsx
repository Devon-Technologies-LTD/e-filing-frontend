"use client";
import React from "react";

export default function LabelValuePair({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-2">
      <label className="text-sm font-bold break-words">{label}</label>
      <div className="text-sm font-medium break-words">{value || "N/A"}</div>
    </div>
  );
}
