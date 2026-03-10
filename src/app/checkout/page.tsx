/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Package, RefreshCcw } from "lucide-react";
import { ordersService } from "@/services/orders.service";
import type { Order } from "@/types/orders.types";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function formatDate(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(d);
}

function formatMoney(value?: number) {
  if (typeof value !== "number") return "—";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getOrderItems(order: Order) {
  return Array.isArray(order.products) ? order.products : [];
}

function getOrderItemsCount(order: Order) {
  return getOrderItems(order).reduce(
    (acc, item) => acc + (item.quantity ?? 0),
    0,
  );
}

function getOrderTotal(order: Order) {
  if (typeof order.totalValue === "number") {
    return order.totalValue;
  }

  return getOrderItems(order).reduce((sum, item) => {
    const price = item.price ?? 0;
    return sum + price * item.quantity;
  }, 0);
}

function getOrderItemsLabel(order: Order) {
  const items = getOrderItems(order);

  if (items.length === 0) return "—";

  return items
    .map(
      (item) =>
        `${item.quantity}x ${item.name ?? `Produto #${item.productId}`}`,
    )
    .join(", ");
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadOrders() {
    setError(null);

    try {
      setIsLoading(true);
      const data = await ordersService.listMyOrders();
      setOrders(data);
    } catch (err: any) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message ??
        (typeof err?.response?.data === "string" ? err.response.data : null) ??
        err?.message ??
        "Não foi possível carregar os pedidos.";

      setError(`${status ? `Status ${status}: ` : ""}${message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const rows = useMemo(() => {
    return orders.map((order) => ({
      id: String(order.id ?? "—"),
      date: formatDate(order.createdAt),
      status: "Pedido realizado",
      qty: getOrderItemsCount(order),
      total: formatMoney(getOrderTotal(order)),
      itemsLabel: getOrderItemsLabel(order),
    }));
  }, [orders]);

  return (
    <ProtectedRoute requireAdmin>
      <div className="mx-auto max-w-[1280px] px-4 py-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Package className="text-primary" size={32} />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-zinc-800">Pedidos</h1>
              <p className="text-xs text-zinc-500">
                Lista de pedidos do usuário logado
              </p>
            </div>
          </div>

          <button
            onClick={loadOrders}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
            disabled={isLoading}
          >
            <RefreshCcw size={14} />
            Recarregar
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-600">
              <tr>
                <th className="px-4 py-3 text-left">Pedido</th>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Produtos</th>
                <th className="px-4 py-3 text-left">Itens</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-zinc-500"
                    colSpan={6}
                  >
                    Carregando...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-zinc-500"
                    colSpan={6}
                  >
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                rows.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-zinc-100 align-top"
                  >
                    <td className="px-4 py-3 font-semibold text-zinc-800">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-zinc-600">{order.date}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                        {order.status}
                      </span>
                    </td>
                    <td className="max-w-[380px] px-4 py-3 text-zinc-700">
                      <span className="line-clamp-2">{order.itemsLabel}</span>
                    </td>
                    <td className="px-4 py-3 text-zinc-700">
                      {order.qty || "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-primary">
                      {order.total}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
