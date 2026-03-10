"use client";

import Link from "next/link";
import { Package, Boxes, Users, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const userName = user?.name ?? "Meu perfil";

  return (
    <ProtectedRoute requireAdmin>
      <div className="mx-auto max-w-[1280px] px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <Settings className="text-primary" size={32} />
          <h1 className="text-2xl font-bold text-zinc-800">Admin</h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Link
            href="/admin/orders"
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition hover:bg-zinc-50"
          >
            <div className="flex items-center gap-2">
              <Package className="text-primary" />
              <span className="font-bold text-zinc-800">Pedidos</span>
            </div>
            <p className="mt-2 text-sm text-zinc-600">
              Consultar e gerenciar pedidos.
            </p>
          </Link>

          <Link
            href="/admin/products"
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition hover:bg-zinc-50"
          >
            <div className="flex items-center gap-2">
              <Boxes className="text-primary" />
              <span className="font-bold text-zinc-800">Produtos</span>
            </div>
            <p className="mt-2 text-sm text-zinc-600">CRUD de produtos.</p>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
