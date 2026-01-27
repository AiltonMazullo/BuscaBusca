import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import { ShoppingCart, Truck, ShieldCheck, CreditCard } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductCard } from "@/components/ProductCard";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const installmentPrice = product.price / 10;
  const cashPrice = product.price * 0.9;

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="mb-6 text-sm text-zinc-500">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <a href={`/category/${product.category}`} className="hover:text-primary">{product.category}</a>
        <span className="mx-2">/</span>
        <span className="font-semibold text-zinc-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-lg border border-zinc-100 bg-white p-8">
            {product.isFeatured && (
               <div className="absolute left-0 top-0 z-10 bg-zinc-700 px-4 py-1 text-xs font-bold uppercase text-white">
                DESTAQUE
              </div>
            )}
          <div className="aspect-square w-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-zinc-900">{product.name}</h1>
          
          <div className="flex items-center gap-2 text-sm text-zinc-500">
             <span className="rounded bg-zinc-100 px-2 py-1 font-medium text-zinc-600">
                Cód: {product.id}
             </span>
             <span>|</span>
             <span className="text-green-600 font-medium">Disponível em estoque</span>
          </div>

          <div className="mt-4 flex flex-col gap-1 rounded-lg bg-zinc-50 p-6">
            <span className="text-3xl font-bold text-zinc-900">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </span>
            <span className="text-sm text-zinc-500">
              ou <span className="font-bold text-zinc-900">10x de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(installmentPrice)}</span> sem juros
            </span>
             <span className="text-sm text-green-600 font-medium">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cashPrice)} à vista (10% de desconto)
            </span>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-zinc-900">Descrição</h3>
            <p className="text-zinc-600 leading-relaxed">
              {product.description}
            </p>
            <p className="text-sm text-zinc-500 mt-2">
              *Imagens meramente ilustrativas. As cores podem variar de acordo com o monitor.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-4">
             <AddToCartButton product={product} />
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
             <div className="flex flex-col items-center gap-2 text-center p-4 rounded border border-zinc-100 bg-white">
                <Truck className="text-primary" size={24} />
                <span className="text-xs font-bold text-zinc-700">ENTREGA RÁPIDA</span>
             </div>
             <div className="flex flex-col items-center gap-2 text-center p-4 rounded border border-zinc-100 bg-white">
                <ShieldCheck className="text-primary" size={24} />
                <span className="text-xs font-bold text-zinc-700">GARANTIA DE 1 ANO</span>
             </div>
             <div className="flex flex-col items-center gap-2 text-center p-4 rounded border border-zinc-100 bg-white">
                <CreditCard className="text-primary" size={24} />
                <span className="text-xs font-bold text-zinc-700">PARCELAMENTO</span>
             </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h2 className="text-2xl font-bold text-zinc-800">Produtos Relacionados</h2>
          <div className="h-1 w-12 rounded-full bg-primary"></div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
        </div>
      </div>
    </div>
  );
}
