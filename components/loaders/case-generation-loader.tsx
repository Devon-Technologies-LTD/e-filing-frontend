import React from "react";

const CaseGenerationLoader = () => {
  return (
    <video autoPlay loop muted playsInline className="w-full h-full scale-[2]">
      <source src="/spinner.webm" type="video/webm" />
    </video>
  );
};

export default CaseGenerationLoader;
