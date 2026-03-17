// src/hooks/useSearch.ts
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { productsService } from "@/services/products.service";
import type { Product } from "@/types/products.types";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const all = await productsService.list();
      const filtered = all.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase()),
      );
      setResults(filtered.slice(0, 6)); // máx 6 no dropdown
      setIsOpen(true);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  const submit = useCallback(() => {
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }, [query, router]);

  const clear = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    submit,
    clear,
  };
}
