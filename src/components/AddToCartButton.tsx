"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { ShoppingCart, Minus, Plus } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex items-center rounded-md border border-zinc-200">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="flex h-12 w-12 items-center justify-center text-zinc-600 hover:bg-zinc-100"
        >
          <Minus size={16} />
        </button>
        <div className="flex h-12 w-16 items-center justify-center border-x border-zinc-200 font-semibold text-zinc-900">
          {quantity}
        </div>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="flex h-12 w-12 items-center justify-center text-zinc-600 hover:bg-zinc-100"
        >
          <Plus size={16} />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-primary/90"
      >
        <ShoppingCart size={20} />
        ADICIONAR AO CARRINHO
      </button>
    </div>
  );
}
