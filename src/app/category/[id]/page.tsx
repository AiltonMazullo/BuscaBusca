import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
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
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold uppercase text-zinc-900">
            {categorySlug === 'todos' ? 'Todos os Produtos' : categoryName}
        </h1>
        <p className="text-zinc-500">
            {categoryProducts.length} produtos encontrados
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </div>
  );
}
