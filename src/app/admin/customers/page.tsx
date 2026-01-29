import { Users } from "lucide-react";

export default function AdminCustomersPage() {
  const customers = [
    { id: "CLI-001", name: "João Silva", email: "joao@exemplo.com", phone: "(11) 90000-0001" },
    { id: "CLI-002", name: "Maria Souza", email: "maria@exemplo.com", phone: "(11) 90000-0002" },
    { id: "CLI-003", name: "Pedro Lima", email: "pedro@exemplo.com", phone: "(11) 90000-0003" },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="text-primary" size={32} />
        <h1 className="text-2xl font-bold text-zinc-800">Clientes</h1>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-600">
            <tr>
              <th className="px-4 py-3 text-left">Código</th>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">E-mail</th>
              <th className="px-4 py-3 text-left">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-zinc-100">
                <td className="px-4 py-3 font-semibold text-zinc-800">{c.id}</td>
                <td className="px-4 py-3 text-zinc-700">{c.name}</td>
                <td className="px-4 py-3 text-zinc-700">{c.email}</td>
                <td className="px-4 py-3 text-zinc-700">{c.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

