"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-pulse text-black font-light tracking-widest uppercase text-xs">
          Loading Luxury Experience...
        </div>
      </div>
    );
  }

  if (!session) {
    window.location.href = "/login";
  }

  return <>{children}</>;
}
