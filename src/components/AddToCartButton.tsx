"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/products.types";
import { ShoppingCart } from "lucide-react";

interface Props {
  product: Product;
}

export function AddToCartButton({ product }: Props) {
  const { addToCart, updateQuantity, getProductQuantity } = useCart();

  const quantity = getProductQuantity(product.id);

  function increase() {
    if (quantity === 0) {
      addToCart(product);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  }

  function decrease() {
    updateQuantity(product.id, quantity - 1);
  }

  return (
    <div className="flex gap-3">
      <div className="flex h-10 items-stretch overflow-hidden rounded bg-zinc-100">
        <button
          onClick={decrease}
          className="w-10 text-lg font-bold text-zinc-600 hover:bg-zinc-200"
        >
          -
        </button>

        <div className="flex w-12 items-center justify-center text-sm font-semibold">
          {quantity || 0}
        </div>

        <button
          onClick={increase}
          className="w-10 text-lg font-bold text-zinc-600 hover:bg-zinc-200"
        >
          +
        </button>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="flex items-center gap-2 rounded bg-primary px-6 py-2 text-white"
      >
        <ShoppingCart size={18} />
        ADICIONAR AO CARRINHO
      </button>
    </div>
  );
}
