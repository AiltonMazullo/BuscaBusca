// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Package, RefreshCcw } from "lucide-react";
// import { ordersService } from "@/services/orders.service";
// import { useAuth } from "@/hooks/useAuth";
// import type { Order } from "@/types/orders.types";

// function formatDate(value?: string) {
//   if (!value) return "—";

//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "—";

//   return new Intl.DateTimeFormat("pt-BR", {
//     dateStyle: "short",
//     timeStyle: "short",
//   }).format(date);
// }

// function formatPrice(value: number) {
//   return new Intl.NumberFormat("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   }).format(value);
// }

// function getOrderTotal(order: Order) {
//   if (typeof order.totalValue === "number") {
//     return order.totalValue;
//   }

//   return (order.products ?? []).reduce((sum, item) => {
//     return sum + (item.price ?? 0) * item.quantity;
//   }, 0);
// }

// export default function MyOrdersPage() {
//   const router = useRouter();
//   const { isAuthenticated } = useAuth();

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   async function loadOrders() {
//     try {
//       setError(null);
//       setIsLoading(true);

//       const data = await ordersService.listMyOrders();
//       setOrders(data);
//     } catch (err: any) {
//       const status = err?.response?.status;
//       const message =
//         err?.response?.data?.message ??
//         (typeof err?.response?.data === "string" ? err.response.data : null) ??
//         err?.message ??
//         "Erro ao carregar pedidos.";

//       setError(`${status ? `Status ${status}: ` : ""}${message}`);
//       setOrders([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/login?redirectTo=/my-orders");
//       return;
//     }

//     loadOrders();
//   }, [isAuthenticated, router]);

//   const normalizedOrders = useMemo(() => {
//     return orders.map((order) => ({
//       ...order,
//       total: getOrderTotal(order),
//     }));
//   }, [orders]);

//   return (
//     <div className="mx-auto max-w-[1280px] px-4 py-8">
//       <div className="mb-8 flex items-center justify-between gap-3">
//         <div className="flex items-center gap-3">
//           <Package className="text-primary" size={32} />
//           <div className="flex flex-col">
//             <h1 className="text-2xl font-bold text-zinc-800">Meus Pedidos</h1>
//             <p className="text-sm text-zinc-500">
//               Acompanhe os pedidos feitos na sua conta.
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={loadOrders}
//           disabled={isLoading}
//           className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
//         >
//           <RefreshCcw size={14} />
//           Recarregar
//         </button>
//       </div>

//       {isLoading ? (
//         <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500 shadow-sm">
//           Carregando pedidos...
//         </div>
//       ) : error ? (
//         <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
//           {error}
//         </div>
//       ) : normalizedOrders.length === 0 ? (
//         <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500 shadow-sm">
//           Você ainda não possui pedidos.
//         </div>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {normalizedOrders.map((order) => (
//             <div
//               key={order.id}
//               className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
//             >
//               <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                 <div>
//                   <div className="flex items-center gap-3">
//                     <span className="font-bold text-zinc-800">#{order.id}</span>
//                     <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
//                       Pedido realizado
//                     </span>
//                   </div>
//                   <p className="mt-1 text-sm text-zinc-500">
//                     Realizado em {formatDate(order.createdAt)}
//                   </p>
//                 </div>

//                 <div className="text-right">
//                   <span className="block text-lg font-bold text-primary">
//                     {formatPrice(order.total)}
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-4 border-t border-zinc-100 pt-4">
//                 <p className="mb-2 text-sm font-medium text-zinc-700">
//                   Itens do pedido:
//                 </p>

//                 {order.products?.length ? (
//                   <ul className="space-y-2 text-sm text-zinc-600">
//                     {order.products.map((item, index) => (
//                       <li
//                         key={`${order.id}-${item.productId}-${index}`}
//                         className="flex items-center justify-between gap-4"
//                       >
//                         <span>
//                           {item.quantity}x{" "}
//                           {item.name ?? `Produto #${item.productId}`}
//                         </span>

//                         <span className="font-semibold text-zinc-800">
//                           {formatPrice((item.price ?? 0) * item.quantity)}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-sm text-zinc-500">
//                     Nenhum item encontrado neste pedido.
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
