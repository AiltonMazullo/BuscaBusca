/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import Link from "next/link";
import { Truck, ShieldCheck, CreditCard } from "lucide-react";

import { productsService } from "@/services/products.service";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/products.types";
import { slugify } from "@/utils/utils";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

function sameId(a: Product["id"], b: string) {
  return String(a) === String(b);
}

export default async function ProductPage(props: ProductPageProps) {
  const { id } = await props.params;

  // ✅ busca todos e acha pelo id (se você tiver endpoint GET /products/:id, melhor ainda)
  let products: Product[] = [];
  try {
    products = await productsService.list();
  } catch {
    products = [];
  }

  const product = products.find((p) => sameId(p.id, id));

  if (!product) {
    notFound();
  }

  const installmentPrice = product.price / 10;
  const cashPrice = product.price * 0.9;

  const anyP = product as Product & {
    category?: string;
    isFeatured?: boolean;
    imageUrl?: string;
  };
  const categoryName = anyP.category ?? null;
  const categorySlug = categoryName ? slugify(categoryName) : null;

  const related = categoryName
    ? products
        .filter((p) => {
          const cat = (p as any).category;
          return cat === categoryName && String(p.id) !== String(product.id);
        })
        .slice(0, 4)
    : products.filter((p) => String(p.id) !== String(product.id)).slice(0, 4);

  const imageSrc = product.photos[0] || anyP.imageUrl || "/logo.svg";

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>

        {categoryName && categorySlug && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/category/${categorySlug}`}
              className="hover:text-primary"
            >
              {categoryName}
            </Link>
          </>
        )}

        <span className="mx-2">/</span>
        <span className="font-semibold text-zinc-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-lg border border-zinc-100 bg-white p-8">
          {(anyP.isFeatured ?? false) && (
            <div className="absolute left-0 top-0 z-10 bg-zinc-700 px-4 py-1 text-xs font-bold uppercase text-white">
              DESTAQUE
            </div>
          )}

          <div className="aspect-square w-full">
            <img
              src={imageSrc}
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
            <span className="font-medium text-green-600">
              Disponível em estoque
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-1 rounded-lg bg-zinc-50 p-6">
            <span className="text-3xl font-bold text-zinc-900">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </span>

            <span className="text-sm text-zinc-500">
              ou{" "}
              <span className="font-bold text-zinc-900">
                10x de{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(installmentPrice)}
              </span>{" "}
              sem juros
            </span>

            <span className="text-sm font-medium text-green-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(cashPrice)}{" "}
              à vista (10% de desconto)
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-zinc-900">Descrição</h3>
            <p className="leading-relaxed text-zinc-600">
              {product.description}
            </p>
          </div>

          <div className="mt-4">
            <AddToCartButton product={product as any} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded border border-zinc-100 bg-white p-4 text-center">
              <Truck className="text-primary" size={24} />
              <span className="text-xs font-bold text-zinc-700">
                ENTREGA RÁPIDA
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 rounded border border-zinc-100 bg-white p-4 text-center">
              <ShieldCheck className="text-primary" size={24} />
              <span className="text-xs font-bold text-zinc-700">
                GARANTIA DE 1 ANO
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 rounded border border-zinc-100 bg-white p-4 text-center">
              <CreditCard className="text-primary" size={24} />
              <span className="text-xs font-bold text-zinc-700">
                PARCELAMENTO
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-8 flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold text-zinc-800">
            Produtos Relacionados
          </h2>
          <div className="h-1 w-12 rounded-full bg-primary" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {related.map((relatedProduct) => (
            <ProductCard
              key={String(relatedProduct.id)}
              product={relatedProduct as any}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
