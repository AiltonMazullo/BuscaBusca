import { Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto w-full bg-zinc-50 border-t border-zinc-200">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-8 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden">
              <img src="/logo.svg" alt="Busca Busca Logo" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-primary">Busca Busca</span>
            </div>
          </div>
          <p className="max-w-xs text-sm text-zinc-500">
            A sua loja online de confiança. Encontre tudo o que precisa com o melhor preço e qualidade.
          </p>
        </div>
        <div className="space-y-2 text-xs">
          <p className="font-semibold text-zinc-700">Entre em contato</p>
          <p>Tel: (55) 9 9638-5040</p>
          <p>lojavirtual@buscabusca.com.br</p>
        </div>
        <div className="space-y-3 text-xs">
          <p className="font-semibold text-zinc-700">Siga nas redes</p>
          <div className="flex gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Facebook size={16} />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Linkedin size={16} />
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-100 bg-zinc-50 py-4 text-center text-[11px] text-zinc-400">
        <span>Site fictício para portfólio. Direitos autorais pertencem à marca original.</span>
      </div>
    </footer>
  );
}

