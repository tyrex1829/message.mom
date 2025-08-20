import LoginPage from "@/components/login";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Pearl Mist Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
        }}
      />

      {/* Your Content/Components */}

      <div className="relative">
        <LoginPage />
      </div>
    </div>
  );
}
