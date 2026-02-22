"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Call the logout API endpoint
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        // Still redirect to home on error
        router.push("/");
      });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p>Logging out...</p>
    </div>
  );
}
