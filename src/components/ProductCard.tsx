"use client";

import * as React from "react";
import Link from "next/link";
import type { Product } from "@/types/products.types";
import { useCart } from "@/context/CartContext";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const photos =
    Array.isArray(product.photos) && product.photos.length > 0
      ? product.photos
      : ["/logo.svg"];

  const imageSrc = photos[selectedImageIndex] || "/logo.svg";

  function handleAdd() {
    addToCart(product, quantity);
  }

  function handlePrevImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    setSelectedImageIndex((current) =>
      current === 0 ? photos.length - 1 : current - 1,
    );
  }

  function handleNextImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    setSelectedImageIndex((current) =>
      current === photos.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-none border-none bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4">
      <div className="relative mb-3 aspect-square w-full overflow-hidden bg-zinc-50 sm:mb-4">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          {product.isFeatured && (
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-zinc-700 py-1 text-center text-[10px] font-bold uppercase text-white">
              DESTAQUE
            </div>
          )}

          <img
            src={imageSrc}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 ease-out md:group-hover:scale-105"
          />
        </Link>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm opacity-0 transition group-hover:opacity-100 hover:bg-white"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm opacity-0 transition group-hover:opacity-100 hover:bg-white"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {photos.length > 1 && (
          <div className="absolute bottom-2 left-0 flex w-full justify-center gap-1 px-2">
            {photos.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedImageIndex(index);
                }}
                className={`h-2 w-2 rounded-full transition ${
                  index === selectedImageIndex ? "bg-primary" : "bg-white/80"
                }`}
                aria-label={`Ver imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <Link href={`/product/${product.id}`} className="hover:text-primary">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-normal text-zinc-600 uppercase">
            {product.name}
          </h3>

          {!!product.category && (
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              {product.category}
            </p>
          )}
        </Link>

        <div className="mt-auto flex flex-col gap-1 pt-2">
          <span className="text-xl font-bold text-zinc-900">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </span>

          <span className="text-xs text-zinc-500">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price * 0.9)}{" "}
            à vista com desconto
          </span>
        </div>

        <div className="mt-4 flex gap-2 transition-all duration-300 md:pointer-events-none md:translate-y-2 md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <div className="flex h-10 w-[112px] items-stretch overflow-hidden rounded bg-zinc-100">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 text-sm font-bold text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-primary"
              aria-label="Diminuir quantidade"
            >
              -
            </button>

            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const v = Number(e.target.value);
                setQuantity(Number.isFinite(v) ? Math.max(1, v) : 1);
              }}
              className="w-10 bg-transparent text-center text-sm font-semibold text-zinc-700 outline-none"
            />

            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 text-sm font-bold text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-primary"
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded bg-primary text-xs font-bold uppercase text-white transition-colors hover:bg-primary/90"
          >
            <ShoppingCart size={18} />
            COMPRAR
          </button>
        </div>
      </div>
    </Card>
  );
}
