"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
// import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  function handleAdd() {
    // Add logic for adding multiple items if your context supports it, 
    // otherwise just loop or update context to accept quantity
    for(let i=0; i<quantity; i++) {
        addToCart(product);
    }
  }

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-none border-none bg-white p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square w-full mb-4">
        {product.isFeatured && (
           <div className="absolute bottom-0 left-0 right-0 z-10 bg-zinc-700 py-1 text-center text-[10px] font-bold uppercase text-white">
            DESTAQUE
          </div>
        )}
        <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-full w-full object-contain p-4" 
        />
        {/* Mock stamps for realism based on image */}
        <div className="absolute bottom-8 left-0 flex w-full justify-center gap-1 px-2">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-6 w-6 rounded-full bg-green-500 text-[6px] flex items-center justify-center text-white font-bold border border-white">
                    ICON
                </div>
            ))}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-normal text-zinc-600 uppercase">
            {product.name}
        </h3>
        
        <div className="mt-auto flex flex-col gap-1 pt-2">
          <span className="text-xl font-bold text-zinc-900">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
          </span>
          <span className="text-xs text-zinc-500">
             {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price * 0.9)} à vista com desconto
          </span>
        </div>

        <div className="mt-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-10 w-16 items-center rounded bg-zinc-100 px-1">
                <input 
                    type="number" 
                    min="1" 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-transparent text-center text-sm font-semibold text-zinc-600 outline-none"
                />
                <div className="flex flex-col">
                    <button onClick={() => setQuantity(q => q + 1)} className="text-[8px] px-1 hover:text-primary">▲</button>
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-[8px] px-1 hover:text-primary">▼</button>
                </div>
            </div>
            
            <button
                type="button"
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 rounded bg-primary h-10 text-xs font-bold text-white transition-colors hover:bg-primary/90 uppercase"
            >
                <span className="text-lg">🛒</span>
                COMPRAR
            </button>
        </div>
      </div>
    </Card>
  );
}

