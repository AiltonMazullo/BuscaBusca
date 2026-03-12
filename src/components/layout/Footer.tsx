"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-[1280px] px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[28px] bg-primary px-6 py-10 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] md:px-10 md:py-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.16),transparent_24%)]" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="max-w-xl"
            >
              <span className="mb-3 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                Oferta especial
              </span>

              <h3 className="text-2xl font-bold leading-tight md:text-3xl">
                Encontre tudo o que precisa
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/90 md:text-base">
                Ferramentas, eletrônicos e muito mais com os melhores preços da
                internet.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg shadow-black/10 transition hover:bg-zinc-100"
              >
                Explorar produtos
              </Link>
            </motion.div>
          </div>

          <motion.div
            aria-hidden="true"
            animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />

          <motion.div
            aria-hidden="true"
            animate={{ x: [0, -10, 0], y: [0, 12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex max-w-sm flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: -6, scale: 1.04 }}
                transition={{ duration: 0.2 }}
                className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-200"
              >
                <img
                  src="/logo.svg"
                  alt="Busca Busca Logo"
                  className="h-8 w-8 object-contain"
                />
              </motion.div>

              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-primary">
                  Busca Busca
                </span>
                <span className="text-xs text-zinc-500">
                  Loja online de confiança
                </span>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              A sua loja online de confiança. Encontre tudo o que precisa com o
              melhor preço e qualidade.
            </p>
          </motion.div>

          <div className="grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl bg-white p-[1px]"
            >
              <motion.div
                animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl bg-[linear-gradient(90deg,hsl(var(--primary)/0.25),hsl(var(--primary)),hsl(var(--primary)/0.25))] bg-[length:200%_200%]"
              />
              <div className="relative h-full rounded-2xl bg-white/95 p-5 text-center shadow-sm backdrop-blur-sm md:text-left">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700">
                  Entre em contato
                </p>
                <div className="space-y-2 text-sm text-zinc-600">
                  <motion.p
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.18 }}
                    className="cursor-default"
                  >
                    Tel: (55) 9 9638-5040
                  </motion.p>
                  <motion.p
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.18 }}
                    className="cursor-default break-all"
                  >
                    lojavirtual@buscabusca.com.br
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl bg-white p-[1px]"
            >
              <motion.div
                animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl bg-[linear-gradient(90deg,hsl(var(--primary)/0.25),hsl(var(--primary)),hsl(var(--primary)/0.25))] bg-[length:200%_200%]"
              />
              <div className="relative h-full rounded-2xl bg-white/95 p-5 shadow-sm backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2">
                  <Truck className="text-primary" size={18} />
                  <p className="text-sm font-semibold text-zinc-800">
                    Entrega segura
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-zinc-500">
                  Entrega para todo o Brasil com agilidade e segurança.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl bg-white p-[1px]"
            >
              <motion.div
                animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl bg-[linear-gradient(90deg,hsl(var(--primary)/0.25),hsl(var(--primary)),hsl(var(--primary)/0.25))] bg-[length:200%_200%]"
              />
              <div className="relative h-full rounded-2xl bg-white/95 p-5 shadow-sm backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2">
                  <CreditCard className="text-primary" size={18} />
                  <p className="text-sm font-semibold text-zinc-800">
                    Pagamento
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-zinc-500">
                  Pague do jeito que preferir com praticidade, rapidez e
                  segurança.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl bg-white p-[1px]"
            >
              <motion.div
                animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl bg-[linear-gradient(90deg,hsl(var(--primary)/0.25),hsl(var(--primary)),hsl(var(--primary)/0.25))] bg-[length:200%_200%]"
              />
              <div className="relative h-full rounded-2xl bg-white/95 p-5 shadow-sm backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2">
                  <ShieldCheck className="text-primary" size={18} />
                  <p className="text-sm font-semibold text-zinc-800">
                    Compra segura
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-zinc-500">
                  Ambiente protegido para você comprar com tranquilidade.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="border-t border-zinc-200 bg-zinc-50 py-4"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-2 px-4 text-center text-[11px] text-zinc-400">
          <span>
            Direitos reservados &copy; {new Date().getFullYear()} Busca Busca
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
