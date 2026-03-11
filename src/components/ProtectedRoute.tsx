"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, isHydrated } = useAuth();

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace(`/login?redirectTo=${pathname}`);
      return;
    }

    if (requireAdmin && !isAdmin) {
      router.replace("/");
    }
  }, [isAuthenticated, isAdmin, requireAdmin, router, pathname, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-sm text-zinc-500">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}
