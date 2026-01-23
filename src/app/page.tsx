import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Benefits Bar */}
      <div className="w-full bg-white border-b border-zinc-100">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl text-primary">💳</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-700">PARCELAMENTO</span>
              <span className="text-xs text-zinc-500">Em até 10x no cartão</span>
            </div>
          </div>
          <div className="hidden h-8 w-px bg-zinc-200 md:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-3xl text-primary">🚚</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-700">COMPRE NO SITE</span>
              <span className="text-xs text-zinc-500">Receba em casa</span>
            </div>
          </div>
          <div className="hidden h-8 w-px bg-zinc-200 md:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-3xl text-primary">🔒</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-700">LOJA ESPECIALIZADA</span>
              <span className="text-xs text-zinc-500">Mais de 23 anos no mercado</span>
            </div>
          </div>
          <div className="hidden h-8 w-px bg-zinc-200 md:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-3xl text-primary">⭐</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-700">PAGAMENTO POR PIX</span>
              <span className="text-xs text-zinc-500">10% de desconto</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold text-zinc-800">Destaques da semana</h2>
          <div className="h-1 w-12 rounded-full bg-primary"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
