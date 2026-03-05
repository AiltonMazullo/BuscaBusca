/* eslint-disable @typescript-eslint/no-explicit-any */
import { productsService } from "@/services/products.service";
import { ProductCard } from "@/components/ProductCard";
import { BenefitsBar } from "@/components/BenefitsBar";
import { slugify } from "@/utils/utils";
import type { Product } from "@/types/products.types";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

function getProductSlugCategory(p: Product): string | null {
  // se sua API futuramente tiver category, já funciona
  const anyP = p as Product & { category?: string };
  if (anyP.category) return slugify(anyP.category);

  // fallback (não ideal): tenta categorizar pelo nome (você pode ajustar depois)
  return slugify(p.name);
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { id: categorySlug } = await props.params;

  let products: Product[] = [];
  try {
    products = await productsService.list();
  } catch {
    products = [];
  }

  const showAll =
    categorySlug === "todos" ||
    categorySlug === "produtos" ||
    categorySlug === "";

  const categoryProducts = showAll
    ? products
    : products.filter((p) => getProductSlugCategory(p) === categorySlug);

  const categoryName = showAll
    ? "Todos os Produtos"
    : ((categoryProducts[0] as any)?.category ?? categorySlug);

  return (
    <div className="flex flex-col gap-8 pb-8">
      <BenefitsBar />

      <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 sm:gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold uppercase text-zinc-800 sm:text-2xl">
            {categoryName}
          </h1>
          <div className="h-1 w-12 rounded-full bg-primary" />
          <p className="text-sm text-zinc-500">
            {categoryProducts.length} produtos encontrados
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={String(product.id)} product={product as any} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-zinc-200 bg-zinc-50">
            <p className="text-lg font-medium text-zinc-500">
              Nenhum produto encontrado nesta categoria.
            </p>
            <Link href="/" className="text-primary hover:underline">
              Voltar para Home
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
