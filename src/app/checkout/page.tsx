/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { ordersService } from "@/services/orders.service";

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { items, totalAmount } = useCart();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login?redirectTo=/checkout");
    }
  }, [isAuthenticated, router]);

  const createOrderPayload = useMemo(
    () => ({
      products: items.map((item) => ({
        productId: Number(item.product.id),
        quantity: item.quantity,
      })),
      totalValue: totalAmount,
    }),
    [items, totalAmount],
  );

  async function handleCreateOrder() {
    if (!isAuthenticated) {
      router.push("/login?redirectTo=/checkout");
      return;
    }

    if (items.length === 0) return;

    try {
      setError(null);
      setIsCreatingOrder(true);

      const response = await ordersService.create(createOrderPayload);

      if (response?.checkoutUrl) {
        window.open(response.checkoutUrl, "_blank", "noopener,noreferrer");
        router.push("/");
        return;
      }

      router.push("/my-orders");
    } catch (err: any) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        err?.response?.data?.details ??
        err?.message ??
        "Erro ao finalizar pedido.";

      setError(`${status ? `Status ${status}: ` : ""}${message}`);
    } finally {
      setIsCreatingOrder(false);
    }
  }

  if (!isAuthenticated) return null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-xl font-semibold text-zinc-900">
        Finalização de compra
      </h1>

      <p className="mt-1 text-sm text-zinc-500">
        Usuário logado:{" "}
        <span className="font-medium text-zinc-800">{user?.email}</span>
      </p>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-800">
          Resumo do pedido
        </h2>

        <ul className="mt-4 space-y-3 text-sm text-zinc-700">
          {items.map((item) => (
            <li
              key={item.product.id}
              className="flex items-center justify-between gap-4"
            >
              <span>
                {item.quantity}x {item.product.name}
              </span>
              <span className="font-semibold text-primary">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4 text-sm">
          <span className="font-medium text-zinc-700">Total</span>
          <span className="text-lg font-semibold text-primary">
            {formatPrice(totalAmount)}
          </span>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleCreateOrder}
            disabled={items.length === 0 || isCreatingOrder}
            className="flex w-full items-center justify-center rounded-full border border-primary py-3 text-sm font-semibold uppercase tracking-wide text-primary disabled:cursor-not-allowed disabled:border-zinc-300 disabled:text-zinc-300"
          >
            {isCreatingOrder ? "Finalizando pedido..." : "Finalizar pedido"}
          </button>
        </div>
      </section>
    </div>
  );
}
