import { Package } from "lucide-react";

export default function MyOrdersPage() {
  const orders = [
    {
      id: "PED-123456",
      date: "25/01/2026",
      status: "Entregue",
      total: 1450.90,
      items: ["Parafusadeira DeWalt 20V", "Jogo de Brocas"]
    },
    {
      id: "PED-789012",
      date: "10/12/2025",
      status: "Em trânsito",
      total: 289.90,
      items: ["Jogo de Ferramentas Mayle"]
    }
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Package className="text-primary" size={32} />
        <h1 className="text-2xl font-bold text-zinc-800">Meus Pedidos</h1>
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-zinc-800">#{order.id}</span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 mt-1">Realizado em {order.date}</p>
              </div>
              <div className="text-right">
                <span className="block text-lg font-bold text-primary">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
                </span>
              </div>
            </div>
            
            <div className="mt-4 border-t border-zinc-100 pt-4">
              <p className="text-sm font-medium text-zinc-700 mb-2">Itens do pedido:</p>
              <ul className="list-inside list-disc text-sm text-zinc-600">
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="text-sm font-bold text-primary hover:underline">
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
