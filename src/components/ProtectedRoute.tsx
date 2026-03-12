"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    // usuário não logado
    if (!isAuthenticated) {
      router.replace(`/login?redirectTo=${encodeURIComponent(pathname)}`);
      return;
    }

    // precisa ser admin
    if (requireAdmin && !isAdmin) {
      router.replace("/");
      return;
    }
  }, [isAuthenticated, isAdmin, requireAdmin, router, pathname]);

  // loading enquanto verifica
  if (!isAuthenticated) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-sm text-zinc-500">
        Verificando acesso...
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
