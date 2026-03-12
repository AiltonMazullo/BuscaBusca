"use client";

import Link from "next/link";

const banners = [
  {
    title: "Mega ofertas em eletrônicos",
    subtitle: "Descontos especiais em eletrônicos de última geração",
    cta: "Ver ofertas",
    href: "/category/eletronicos",
    image:
      "https://images.unsplash.com/photo-1581147036324-c1c5d7d4f12f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Linha profissional",
    subtitle: "Equipamentos para uso intenso no dia a dia",
    cta: "Explorar produtos",
    href: "/category/ferramentas",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1200&auto=format&fit=crop",
  },
];

export function HomeBanner() {
  return (
    <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 pt-6">
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl bg-zinc-900">
          <img
            src={banners[0].image}
            alt={banners[0].title}
            className="h-[360px] w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
            <span className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-300">
              Oferta especial
            </span>
            <h1 className="max-w-xl text-3xl font-bold leading-tight md:text-5xl">
              {banners[0].title}
            </h1>
            <p className="mt-3 max-w-lg text-sm text-zinc-100 md:text-base">
              {banners[0].subtitle}
            </p>
            <Link
              href={banners[0].href}
              className="mt-6 inline-flex w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
            >
              {banners[0].cta}
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="relative overflow-hidden rounded-2xl bg-orange-500">
            <img
              src={banners[1].image}
              alt={banners[1].title}
              className="h-[172px] w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-5 text-white">
              <h2 className="text-xl font-bold">{banners[1].title}</h2>
              <p className="mt-2 text-sm">{banners[1].subtitle}</p>
              <Link
                href={banners[1].href}
                className="mt-4 inline-flex w-fit rounded-full bg-white px-4 py-2 text-xs font-semibold text-orange-600"
              >
                {banners[1].cta}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-zinc-800">
                Frete rápido
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Entrega para todo o Brasil
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-zinc-800">
                Pix e cartão
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Pague do jeito que preferir
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
