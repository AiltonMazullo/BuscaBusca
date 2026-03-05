import { BenefitsBar } from "@/components/BenefitsBar";
import { ProductCard } from "@/components/ProductCard";
import { productsService } from "@/services/products.service";
import type { Product } from "@/types/products.types";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

function titleFromSlug(slug: string) {
  if (!slug) return "Categoria";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { id } = await props.params;
  const categorySlug = id;

  let products: Product[] = [];

  try {
    products = await productsService.listByCategory(categorySlug);
  } catch {
    products = [];
  }

  const categoryName =
    products.length > 0
      ? (products[0].category ?? titleFromSlug(categorySlug))
      : titleFromSlug(categorySlug);

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
            {products.length} produto(s) encontrado(s)
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-zinc-200 bg-zinc-50">
            <p className="text-lg font-medium text-zinc-500">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
