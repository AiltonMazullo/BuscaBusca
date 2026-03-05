import { productsService } from "@/services/products.service";
import { ProductCard } from "@/components/ProductCard";
import { BenefitsBar } from "@/components/BenefitsBar";
import type { Product } from "@/types/products.types";

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await productsService.list();
  } catch (err) {
    products = [];
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <BenefitsBar />

      <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 sm:gap-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold text-zinc-800 sm:text-2xl">
            Destaques da semana
          </h2>
          <div className="h-1 w-12 rounded-full bg-primary" />
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-600">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
