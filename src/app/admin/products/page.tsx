"use client";
import { useState } from "react";
import { products as initialProducts } from "@/lib/products";
import type { Product } from "@/types";
import { Boxes, Plus, Trash2, Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: "",
    isFeatured: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      setItems(prev => prev.map(p => p.id === editingId ? { ...(p as Product), ...(form as Product), id: editingId } : p));
      setEditingId(null);
    } else {
      const id = (form.name || "produto").toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
      setItems(prev => [{ ...(form as Product), id }, ...prev]);
    }
    setForm({ name: "", description: "", price: 0, imageUrl: "", category: "", isFeatured: false });
  }

  function handleDelete(id: string) {
    setItems(prev => prev.filter(p => p.id !== id));
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm(p);
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Boxes className="text-primary" size={32} />
        <h1 className="text-2xl font-bold text-zinc-800">Produtos</h1>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-3">
        <input value={form.name || ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nome" className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary" />
        <input value={form.category || ""} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Categoria" className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary" />
        <input value={form.imageUrl || ""} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="Imagem URL" className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary md:col-span-3" />
        <input value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Descrição" className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary md:col-span-3" />
        <input type="number" value={form.price || 0} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} placeholder="Preço" className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary" />
        <label className="flex items-center gap-2 text-sm"><Checkbox checked={form.isFeatured || false} onCheckedChange={(checked) => setForm(f => ({ ...f, isFeatured: Boolean(checked) }))} /> Destaque</label>
        <button className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"><Plus size={16} /> {editingId ? "Salvar" : "Adicionar"}</button>
      </form>

      <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-600">
            <tr>
              <th className="px-4 py-3 text-left">Produto</th>
              <th className="px-4 py-3 text-left">Categoria</th>
              <th className="px-4 py-3 text-left">Preço</th>
              <th className="px-4 py-3 text-left">Destaque</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t border-zinc-100">
                <td className="px-4 py-3 font-semibold text-zinc-800">{p.name}</td>
                <td className="px-4 py-3 text-zinc-700">{p.category}</td>
                <td className="px-4 py-3 text-zinc-700">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}</td>
                <td className="px-4 py-3 text-zinc-700">{p.isFeatured ? "Sim" : "Não"}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(p)} className="mr-2 inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200"><Pencil size={14} /> Editar</button>
                  <button onClick={() => handleDelete(p.id)} className="inline-flex items-center gap-1 rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white hover:bg-red-600"><Trash2 size={14} /> Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
