import { CreditCard, Truck, ShieldCheck, Star } from "lucide-react";

export function BenefitsBar() {
  return (
    <div className="w-full bg-white border-b border-zinc-100">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
          <CreditCard size={32} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-700">PARCELAMENTO</span>
            <span className="text-xs text-zinc-500">Em até 10x no cartão</span>
          </div>
        </div>
        <div className="hidden h-8 w-px bg-zinc-200 md:block"></div>
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
          <Truck size={32} className="text-primary" />  
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-700">COMPRE NO SITE</span>
            <span className="text-xs text-zinc-500">Receba em casa</span>
          </div>
        </div>
        <div className="hidden h-8 w-px bg-zinc-200 md:block"></div>
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
          <ShieldCheck size={32} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-700">LOJA ESPECIALIZADA</span>
            <span className="text-xs text-zinc-500">Mais de 23 anos no mercado</span>
          </div>
        </div>
        <div className="hidden h-8 w-px bg-zinc-200 md:block"></div>
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
          <Star size={32} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-700">PAGAMENTO POR PIX</span>
            <span className="text-xs text-zinc-500">10% de desconto</span>
          </div>
        </div>
      </div>
    </div>
  );
}
