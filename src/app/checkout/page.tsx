"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
// import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, totalAmount } = useCart();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-xl font-semibold text-zinc-900">
        Finalização de compra
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Usuário logado:{" "}
        <span className="font-medium text-zinc-800">{user?.email}</span>
      </p>

      <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-800">
          Resumo do pedido
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-zinc-700">
          {items.map((item) => (
            <li
              key={item.product.id}
              className="flex items-center justify-between"
            >
              <span>
                {item.quantity}x {item.product.name}
              </span>
              <span className="font-semibold text-primary">
                {/* {formatPrice(item.product.price * item.quantity)} */}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4 text-sm">
          <span className="font-medium text-zinc-700">Total</span>
          {/* <span className="text-lg font-semibold text-primary">{formatPrice(totalAmount)}</span> */}
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          A etapa de pagamento ainda será implementada. Esta tela existe apenas
          para demonstrar o fluxo protegido por login.
        </p>
      </section>
    </div>
  );
}
