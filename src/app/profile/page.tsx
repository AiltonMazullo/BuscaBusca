import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <User className="text-primary" size={32} />
        <h1 className="text-2xl font-bold text-zinc-800">Meu Perfil</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Dados Pessoais */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-zinc-800">Dados Pessoais</h2>
          <form className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700">Nome Completo</label>
              <input
                type="text"
                defaultValue="Ailton Santos"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700">E-mail</label>
              <input
                type="email"
                defaultValue="ailton@exemplo.com"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700">CPF</label>
              <input
                type="text"
                defaultValue="123.456.789-00"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700">Telefone</label>
              <input
                type="tel"
                defaultValue="(11) 99999-9999"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <button className="mt-4 w-full rounded-md bg-primary py-2 text-sm font-bold text-white hover:bg-primary/90">
              Salvar Alterações
            </button>
          </form>
        </div>

        {/* Endereços */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-zinc-800">Endereços</h2>
          <div className="space-y-4">
            <div className="relative rounded-md border border-primary bg-primary/5 p-4">
              <span className="absolute right-4 top-4 text-xs font-bold text-primary">Principal</span>
              <p className="font-bold text-zinc-800">Casa</p>
              <p className="text-sm text-zinc-600">Rua das Flores, 123</p>
              <p className="text-sm text-zinc-600">Bairro Jardim - São Paulo/SP</p>
              <p className="text-sm text-zinc-600">CEP: 01234-567</p>
              <div className="mt-3 flex gap-3">
                <button className="text-xs font-bold text-primary hover:underline">Editar</button>
                <button className="text-xs font-bold text-red-500 hover:underline">Excluir</button>
              </div>
            </div>
            
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-zinc-300 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50">
              + Adicionar novo endereço
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
