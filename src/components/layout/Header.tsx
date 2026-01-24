"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Bus, Search, User, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import router from "next/router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

const MENU_ITEMS = [
  { label: "AR E VENTILAÇÃO", route: "/category/ar-e-ventilacao" },
  {
    label: "AQUECIMENTO ELÉTRICO",
    route: "/category/aquecimento-eletrico",
    children: ["Duchas e Chuveiros", "Aquecedor", "Resistencia"]
  },
  { label: "BOMBAS E MOTOBOMBAS", route: "/category/bombas-e-motobombas" },
  { label: "CAIXAS", route: "/category/caixas" },
  {
    label: "ESCADAS",
    route: "/category/escadas",
    children: ["Escada de Fibra", "Escada de aluminio"]
  },
  {
    label: "FERRAMENTAS",
    route: "/category/ferramentas",
    children: ["Chaves", "Bolsas", "Torno"]
  },
  {
    label: "FERRAMENTAS ELÉTRICAS",
    route: "/category/ferramentas-eletricas",
    children: [
      "APARADOR", "CARREGADOR/BATERIA", "CHAVE DE IMPACTO", "COMPRESSOR",
      "ESMERILHADEIRA", "FURADEIRA", "LAVADORA", "LIXADEIRA", "NIVEL",
      "PARAFUSADEIRA", "PINTURA", "ROÇADEIRA", "RETIFICA", "SERRA",
      "SOPRADOR TÉRMICO", "SOPRADOR/ASPIRADOR", "TRENA", "TUPIA", "OSCILANTE"
    ]
  },
  { label: "LÂMPADAS", route: "/category/lampadas" },
  {
    label: "+ CATEGORIAS",
    route: "/category/mais-categorias",
    children: [
      "LUMINARIAS", "MATERIAIS ELÉTRICOS", "STANLEY SC", "SEGURANÇA",
      "SOLDAS EM GERAL", "ZEBU"
    ]
  }
];

function HeaderFeaturedProduct() {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = {
    id: "featured-dewalt",
    name: "PARAFUSADEIRA/FURADEIRA 20V 2 BAT DCD7781D2BR DEWALT",
    price: 1250.90,
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=600&auto=format&fit=crop",
    description: "Parafusadeira potente",
    category: "Ferramentas",
    isFeatured: true,
  };

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="group w-[300px] flex-shrink-0 border-l pl-8">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-zinc-100">
          <img
            src={product.imageUrl}
            alt="Destaque"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-zinc-800/80 py-2 text-center text-xs font-bold text-white">
            DESTAQUE
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-800 line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-2">
            <span className="text-xl font-bold text-primary">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </span>
            <p className="text-xs text-zinc-500">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price * 0.9)} à vista com desconto
            </p>
          </div>
          
          {/* Hover Controls */}
          <div className="mt-4 flex gap-2 transition-all duration-300 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
             <div className="flex h-10 w-[112px] items-stretch overflow-hidden rounded bg-zinc-100">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 text-sm font-bold text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-primary"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                className="w-10 bg-transparent text-center text-sm font-semibold text-zinc-700 outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 text-sm font-bold text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-primary"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded bg-primary text-xs font-bold uppercase text-white transition-colors hover:bg-primary/90"
            >
              <ShoppingCart size={18} />
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { totalQuantity, openCart } = useCart();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <header className="w-full bg-white shadow-sm">
      {!isAuthPage && (
        <>
          {/* Top Bar */}
          <div className="w-full bg-primary text-xs font-medium text-white">
            <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-2">
              <span>PRECISA DE AJUDA?</span>
              <div className="flex items-center gap-2">
                <Bus size={30} className="text-white" />

                <span>COMPRE NO SITE E RECEBA EM CASA</span>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="hidden md:flex mx-auto max-w-[1280px] items-center justify-between gap-8 px-4 py-6">
            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-2">
              <div className="h-12 w-12 overflow-hidden">
                <img src="/logo.svg" alt="Busca Busca Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-primary">Busca Busca</span>
                <span className="text-[10px] text-zinc-500">Loja Virtual</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden flex-1 items-center rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-700 sm:flex">
              <input
                type="text"
                placeholder="O que você procura?"
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
              />
              <Search size={16} className="text-primary" />
            </div>

            {/* User & Cart */}
            <div className="flex items-center gap-6">
              <Link href="/login" className="flex items-center gap-2 text-zinc-700 hover:text-primary">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary text-lg">
                  <User size={20} className="text-primary"/>
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-medium">Entrar / Cadastrar</span>
                </div>
              </Link>

              <button
                type="button"
                onClick={openCart}
                className="group relative flex items-center gap-2 text-zinc-700 hover:text-primary">
                <div className="relative">
                  <ShoppingCart size={28} className="text-primary"/>
                  {totalQuantity > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white shadow-sm">
                      {totalQuantity}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="w-full bg-primary text-white">
            <div className="mx-auto max-w-[1280px] px-4">
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <NavigationMenu className="max-w-full justify-start">
                  <NavigationMenuList className="gap-4">
                    {MENU_ITEMS.map((item) => (
                      <NavigationMenuItem key={item.label}>
                        {item.children ? (
                          <>
                            <NavigationMenuTrigger className="group inline-flex h-14 items-center justify-center bg-transparent hover:bg-transparent text-[13px] font-semibold uppercase text-white transition-colors hover:text-white focus:text-white focus:bg-transparent focus:outline-none data-[active]:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white rounded-none border-b-2 border-transparent hover:border-white data-[state=open]:border-white px-2">
                              {item.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="w-full bg-white p-6 shadow-lg">
                              <div className="flex gap-12 w-[800px] max-w-full">
                                {/* Categories List */}
                                <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-3 content-start">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child}
                                      href="#"
                                      className="text-sm text-zinc-600 hover:text-primary transition-colors uppercase whitespace-nowrap"
                                    >
                                      {child}
                                    </Link>
                                  ))}
                                </div>
                                
                                {/* Featured Product */}
                                <div className="w-[300px] flex-shrink-0 border-l pl-8">
                                  <div className="flex flex-col gap-4">
                                    <div className="relative aspect-square w-full overflow-hidden rounded-md bg-zinc-100">
                                      <img
                                        src="https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=600&auto=format&fit=crop"
                                        alt="Destaque"
                                        className="h-full w-full object-cover"
                                      />
                                      <div className="absolute bottom-0 left-0 right-0 bg-zinc-800/80 py-2 text-center text-xs font-bold text-white">
                                        DESTAQUE
                                      </div>
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-bold text-zinc-800 line-clamp-2">
                                        PARAFUSADEIRA/FURADEIRA 20V 2 BAT DCD7781D2BR DEWALT
                                      </h3>
                                      <div className="mt-2">
                                        <span className="text-xl font-bold text-primary">R$ 1.250,90</span>
                                        <p className="text-xs text-zinc-500">
                                          R$ 1.125,81 à vista com desconto ou 10x R$ 125,09 Sem juros
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <Link href={item.route} legacyBehavior passHref>
                            <NavigationMenuLink className="group inline-flex h-14 items-center justify-center bg-transparent hover:bg-transparent text-base font-semibold uppercase text-white transition-colors hover:text-white focus:text-white focus:outline-none relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100">
                              {item.label}
                            </NavigationMenuLink>
                          </Link>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Mobile Navigation (Scrollable) */}
              <div className="flex w-full items-center gap-6 overflow-x-auto py-3 md:hidden no-scrollbar">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.route}
                    className="whitespace-nowrap text-xs font-semibold uppercase text-white/90 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Header (Simplified) */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:hidden">
        <div className="flex items-center gap-2">
          <Button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
          >
            <Menu size={20} />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8 object-contain" />
            <span className="text-lg font-semibold text-primary">Busca Busca</span>
          </Link>
        </div>

        {!isAuthPage && (
          <div className="flex items-center gap-4">
             <Button
              size="icon"
              onClick={openCart}
              className="relative rounded-full bg-primary text-white hover:bg-primary/90"
            >
              <ShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-primary shadow-sm">
                  {totalQuantity}
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
