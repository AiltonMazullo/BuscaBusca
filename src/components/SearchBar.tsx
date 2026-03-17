// src/components/SearchBar.tsx
"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import type { Product } from "@/types/products.types";

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function SearchBar() {
  const {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    submit,
    clear,
  } = useSearch();
  const containerRef = useRef<HTMLDivElement>(null);

  // fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div ref={containerRef} className="relative hidden flex-1 sm:flex">
      {/* Input */}
      <div className="flex w-full items-center rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-700 focus-within:ring-2 focus-within:ring-primary/40">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="O que você procura?"
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
        />
        {query && (
          <button
            onClick={clear}
            className="mr-2 text-zinc-400 hover:text-zinc-600"
          >
            <X size={14} />
          </button>
        )}
        <button onClick={submit} className="text-primary">
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Search size={16} />
          )}
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-zinc-500">
              Nenhum produto encontrado.
            </p>
          ) : (
            <>
              <ul>
                {results.map((product) => (
                  <DropdownItem
                    key={product.id}
                    product={product}
                    onSelect={() => setIsOpen(false)}
                  />
                ))}
              </ul>
              <div className="border-t border-zinc-100 px-4 py-2">
                <button
                  onClick={submit}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Ver todos os resultados para: &quot;{query}&quot;
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DropdownItem({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: () => void;
}) {
  const photo = Array.isArray(product.photos)
    ? product.photos[0]
    : product.photos;

  return (
    <li>
      <Link
        href={`/product/${product.id}`}
        onClick={onSelect}
        className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-50"
      >
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-zinc-100 bg-zinc-50">
          {photo ? (
            <img
              src={photo}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-zinc-100" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-800">
            {product.name}
          </p>
          <p className="text-xs text-primary font-semibold">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </li>
  );
}
