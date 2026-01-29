import Link from "next/link";
import { User, Settings, Package, Boxes, Users } from "lucide-react";

export default function MyProfilePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <User className="text-primary" size={32} />
        <h1 className="text-2xl font-bold text-zinc-800">Meu Perfil</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-zinc-800">Dados Pessoais</h2>
          <div className="space-y-3 text-sm">
            <p className="text-zinc-600">Nome: <span className="font-semibold text-zinc-800">Usuário</span></p>
            <p className="text-zinc-600">E-mail: <span className="font-semibold text-zinc-800">usuario@exemplo.com</span></p>
            <p className="text-zinc-600">Telefone: <span className="font-semibold text-zinc-800">(11) 99999-0000</span></p>
          </div>
          <button className="mt-6 w-full rounded-md bg-primary py-2 text-sm font-bold text-white hover:bg-primary/90">Editar</button>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-zinc-800"><Package size={18} /> Meus Pedidos</h2>
          <p className="text-sm text-zinc-600">Acompanhe seus pedidos em tempo real.</p>
          <Link href="/my-orders" className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90">Ver pedidos</Link>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-zinc-800"><Settings size={18} /> Admin</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/admin/orders" className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50">
              <span className="flex items-center gap-2"><Package size={16} /> Pedidos</span>
              <span className="text-xs text-primary">Abrir</span>
            </Link>
            <Link href="/admin/products" className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50">
              <span className="flex items-center gap-2"><Boxes size={16} /> Produtos</span>
              <span className="text-xs text-primary">Abrir</span>
            </Link>
            <Link href="/admin/customers" className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50">
              <span className="flex items-center gap-2"><Users size={16} /> Clientes</span>
              <span className="text-xs text-primary">Abrir</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

