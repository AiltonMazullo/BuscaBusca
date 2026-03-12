"use client";
import Link from "next/link";
import { User, Settings, Package, Boxes, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function MyProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <User className="text-primary" size={32} />
        <h1 className="text-2xl font-bold text-zinc-800">Meu Perfil</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-zinc-800">
            Dados Pessoais
          </h2>
          <div className="space-y-3 text-sm">
            <p className="text-zinc-600">
              Nome:{" "}
              <span className="font-semibold text-zinc-800">
                {user?.name ?? "Usuário"}
              </span>
            </p>
            <p className="text-zinc-600">
              E-mail:{" "}
              <span className="font-semibold text-zinc-800">
                {user?.email ?? "usuario@exemplo.com"}
              </span>
            </p>
            <Link
              href="/my-profile"
              className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
            >
              Editar meus dados
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-zinc-800">
            <Package size={18} /> Meus Pedidos
          </h2>
          <p className="text-sm text-zinc-600">
            Acompanhe seus pedidos em tempo real.
          </p>
          <Link
            href="/my-orders"
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
          >
            Ver meus pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}
