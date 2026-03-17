"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { productsService } from "@/services/products.service";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/products.types";
import { Search } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (!query) return;

    startTransition(() => {
      productsService
        .list()
        .then((all) =>
          all.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
        )
        .then(setResults);
    });
  }, [query]);

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Search size={20} className="text-primary" />
        <h1 className="text-xl font-bold text-zinc-800">
          Resultados para{" "}
          <span className="text-primary">&quot;{query}&quot;</span>
        </h1>
        {!isLoading && (
          <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs text-zinc-500">
            {results.length} produto{results.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {isLoading ? (
        <p className="text-sm text-zinc-500">Buscando produtos...</p>
      ) : results.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center">
          <p className="text-zinc-600">
            Nenhum produto encontrado para &quot;{query}&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
