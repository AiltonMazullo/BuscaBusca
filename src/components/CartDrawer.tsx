/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ordersService } from "@/services/orders.service";
import { Trash2, ShoppingCart } from "lucide-react";

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function CartDrawer() {
  const { items, totalAmount, isOpen, closeCart, removeFromCart } = useCart();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (items.length === 0) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const payload = {
        products: items.map((item) => ({
          productId: Number(item.product.id),
          quantity: item.quantity,
        })),
      };

      const response = await ordersService.checkout(payload);

      closeCart();

      // Se a API devolver uma URL do Stripe, redireciona direto
      if (response?.url) {
        window.location.href = response.url;
        return;
      }

      // Fallback: se não vier URL, manda para a página de checkout
      router.push("/checkout");
    } catch (err: any) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message ??
        (typeof err?.response?.data === "string" ? err.response.data : null) ??
        err?.message ??
        "Erro ao iniciar checkout.";

      setError(`${status ? `Status ${status}: ` : ""}${message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <header className="flex items-center justify-between border-b border-zinc-200 px-4 py-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-primary" size={24} />
                <h2 className="text-sm font-semibold text-zinc-800">
                  Carrinho de compras
                </h2>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="h-8 w-8 rounded-full bg-zinc-100 text-sm text-zinc-500"
              >
                ✕
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {items.length === 0 && (
                <p className="py-8 text-center text-sm text-zinc-500">
                  Seu carrinho está vazio.
                </p>
              )}

              <ul className="space-y-4">
                {items.map((item) => {
                  const imageSrc =
                    item.product.photos?.[0] && item.product.photos[0].trim()
                      ? item.product.photos[0]
                      : "/logo.svg";

                  return (
                    <li
                      key={item.product.id}
                      className="flex gap-3 border-b border-zinc-100 pb-4 last:border-b-0"
                    >
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-zinc-50">
                        <img
                          src={imageSrc}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between text-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            {item.product.category && (
                              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                {item.product.category}
                              </p>
                            )}

                            <p className="text-sm font-semibold text-zinc-800">
                              {item.product.name}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(Number(item.product.id))
                            }
                            className="text-zinc-400 transition-colors hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                          <span>Quantidade: {item.quantity}</span>

                          <span className="text-sm font-semibold text-primary">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <footer className="border-t border-zinc-200 p-4 text-sm">
              {error && (
                <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between text-zinc-700">
                <span className="font-medium">Subtotal:</span>
                <span className="text-lg font-semibold text-primary">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-zinc-500">
                Descontos e frete serão calculados na página de finalização.
              </p>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={items.length === 0 || isSubmitting}
                className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-semibold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:bg-zinc-300"
              >
                {isSubmitting ? "Processando..." : "Comprar agora"}
              </button>

              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full text-center text-xs font-medium text-primary"
              >
                Continuar comprando
              </button>

              <div className="mt-4 flex items-center justify-end gap-2 text-xs text-green-500">
                <span>Fale pelo WhatsApp</span>
                <span>●</span>
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
