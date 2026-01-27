import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { BenefitsBar } from "@/components/BenefitsBar";
import { slugify } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const categorySlug = params.id;

  const categoryProducts = products.filter(p => 
    slugify(p.category) === categorySlug || 
    categorySlug === 'todos' || 
    categorySlug === 'produtos'
  );

  const categoryName = categoryProducts.length > 0 
    ? categoryProducts[0].category 
    : categorySlug;

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Reusing BenefitsBar to match Home layout */}
      <BenefitsBar />

      <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 sm:gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold uppercase text-zinc-800 sm:text-2xl">
            {categorySlug === 'todos' ? 'Todos os Produtos' : categoryName}
          </h1>
          <div className="h-1 w-12 rounded-full bg-primary"></div>
          <p className="text-sm text-zinc-500">
            {categoryProducts.length} produtos encontrados
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-zinc-200 bg-zinc-50">
            <p className="text-lg font-medium text-zinc-500">Nenhum produto encontrado nesta categoria.</p>
            <a href="/" className="text-primary hover:underline">Voltar para Home</a>
          </div>
        )}
      </section>
    </div>
  );
}
