import { Package } from "lucide-react";

export default function AdminOrdersPage() {
  const orders = [
    { id: "PED-123456", date: "25/01/2026", status: "Entregue", total: 1450.9, customer: "Cliente A" },
    { id: "PED-789012", date: "10/12/2025", status: "Em trânsito", total: 289.9, customer: "Cliente B" },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Package className="text-primary" size={32} />
        <h1 className="text-2xl font-bold text-zinc-800">Pedidos</h1>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-600">
            <tr>
              <th className="px-4 py-3 text-left">Pedido</th>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">Data</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-zinc-100">
                <td className="px-4 py-3 font-semibold text-zinc-800">{o.id}</td>
                <td className="px-4 py-3 text-zinc-700">{o.customer}</td>
                <td className="px-4 py-3 text-zinc-600">{o.date}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">{o.status}</span>
                </td>
                <td className="px-4 py-3 text-right font-bold text-primary">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(o.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

