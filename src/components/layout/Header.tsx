// src/components/layout/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Bus, Search, User, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";

export const MENU_ITEMS = [
  {
    label: "Eletrônicos",
    route: "/category/eletronicos",
  },
  {
    label: "Calçados",
    route: "/category/calcados",
  },
  {
    label: "Ferramentas",
    route: "/category/ferramentas",
  },
  { label: "Roupas", route: "/category/roupas" },
];

export function Header() {
  const { totalQuantity, openCart } = useCart();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (!isScrolledRef.current && y > 80) {
        isScrolledRef.current = true;
        setIsScrolled(true);
      } else if (isScrolledRef.current && y < 20) {
        isScrolledRef.current = false;
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const accountHref = !isAuthenticated
    ? "/login"
    : isAdmin
      ? "/admin"
      : "/account";

  return (
    <header
      className={`w-full bg-white shadow-sm z-50 transition-all duration-300 ${
        !isAuthPage ? "sticky top-0" : ""
      }`}
    >
      {!isAuthPage && (
        <>
          {/* Top Bar */}
          <div
            className={`w-full bg-primary text-xs font-medium text-white transition-all duration-300 overflow-hidden ${
              isScrolled ? "h-0 opacity-0" : "h-10 opacity-100"
            }`}
          >
            <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-2 h-full">
              <span>PRECISA DE AJUDA?</span>
              <div className="flex items-center gap-2">
                <Bus size={30} className="text-white" />
                <span>COMPRE NO SITE E RECEBA EM CASA</span>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div
            className={`hidden md:flex mx-auto max-w-[1280px] items-center justify-between gap-8 px-4 transition-all duration-300 ${
              isScrolled ? "py-2" : "py-6"
            }`}
          >
            <Link href="/" className="flex flex-shrink-0 items-center gap-2">
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isScrolled ? "h-8 w-8" : "h-12 w-12"
                }`}
              >
                <img
                  src="/logo.svg"
                  alt="Busca Busca Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className={`font-bold text-primary transition-all duration-300 ${
                    isScrolled ? "text-lg" : "text-xl"
                  }`}
                >
                  Busca Busca
                </span>
              </div>
            </Link>

            <div className="hidden flex-1 items-center rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-700 sm:flex">
              <input
                type="text"
                placeholder="O que você procura?"
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
              />
              <Search size={16} className="text-primary" />
            </div>

            <div className="flex items-center gap-6">
              {!isAuthenticated ? (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-zinc-700 hover:text-primary"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary text-lg">
                    <User size={20} className="text-primary" />
                  </div>
                  <div className="flex flex-col text-sm leading-tight">
                    <span className="font-medium">Entrar / Cadastrar</span>
                    <span className="text-[11px] text-zinc-500">
                      Minha conta
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href={accountHref}
                    className="flex items-center gap-2 text-zinc-700 hover:text-primary"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary text-lg">
                      <User size={20} className="text-primary" />
                    </div>
                    <div className="flex flex-col text-sm leading-tight max-w-[220px]">
                      <span className="font-semibold text-zinc-800 line-clamp-1">
                        {user?.name ?? "Minha conta"}
                      </span>
                      <span className="text-[11px] text-zinc-500 line-clamp-1">
                        {user?.email ?? ""}
                      </span>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-primary hover:text-primary"
                  >
                    Sair
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={openCart}
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <ShoppingCart size={28} className="text-primary" />
                <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white">
                  {totalQuantity}
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="w-full bg-primary text-white">
            <div className="mx-auto max-w-[1280px] px-0 md:px-4">
              <div className="w-full bg-primary text-white">
                <div className="mx-auto max-w-[1280px] px-0 md:px-4">
                  {/* Desktop Navigation */}
                  <div className="hidden md:block">
                    <NavigationMenu className="w-full max-w-full">
                      <NavigationMenuList className="flex w-full items-center justify-between">
                        {MENU_ITEMS.map((item) => (
                          <NavigationMenuItem key={item.label}>
                            <Link href={item.route}>
                              <NavigationMenuLink
                                className={[
                                  "group relative inline-flex h-14 items-center justify-center",
                                  "bg-transparent text-[11px] font-bold uppercase text-white",
                                  "tracking-wide transition-colors",
                                  "hover:bg-white/10 focus:bg-white/10",
                                  "focus:outline-none",
                                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full",
                                  "after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300",
                                  "hover:after:scale-x-100",
                                  "px-4",
                                ].join(" ")}
                              >
                                {item.label}
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation (Scrollable) */}
              <div className="flex w-full items-center gap-6 overflow-x-auto py-3 md:hidden no-scrollbar px-4">
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
          <Button className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors">
            <Menu size={20} />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-semibold text-primary">
              Busca Busca
            </span>
          </Link>
        </div>

        {!isAuthPage && (
          <div className="flex items-center gap-3">
            <Link
              href={accountHref}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
              title={isAuthenticated ? "Minha conta" : "Entrar"}
            >
              <User size={18} />
            </Link>

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
