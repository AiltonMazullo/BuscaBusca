"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/products.types";
import { productsService } from "@/services/products.service";
import { Boxes, Plus, Trash2, Pencil, X, ImagePlus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MENU_ITEMS } from "@/components/layout/Header";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ProductForm = {
  name: string;
  description: string;
  price: number;
  category: string;
  photos: string[];
  isFeatured?: boolean;
};

const emptyForm: ProductForm = {
  name: "",
  description: "",
  price: 0,
  category: "",
  photos: [],
  isFeatured: false,
};

const MAX_IMAGES = 5;

function slugFromRoute(route: string) {
  return route.replace("/category/", "");
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadProducts() {
    setError(null);
    try {
      setIsLoading(true);
      const data = await productsService.list();
      setItems(data);
    } catch {
      setError("Não foi possível carregar os produtos.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleAddImages(files: FileList | null) {
    if (!files) return;

    const remaining = MAX_IMAGES - form.photos.length;
    if (remaining <= 0) return;

    const selected = Array.from(files).slice(0, remaining);
    const base64List = await Promise.all(selected.map(fileToBase64));

    setForm((f) => ({
      ...f,
      photos: [...f.photos, ...base64List],
    }));
  }

  function removeImageAt(index: number) {
    setForm((f) => ({
      ...f,
      photos: f.photos.filter((_, i) => i !== index),
    }));
  }

  function clearImages() {
    setForm((f) => ({ ...f, photos: [] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) return setError("Nome é obrigatório.");
    if (!form.description.trim()) return setError("Descrição é obrigatória.");
    if (!form.category.trim()) return setError("Selecione uma categoria.");
    if (form.photos.length === 0)
      return setError("Selecione ao menos 1 imagem.");
    if (Number.isNaN(form.price) || form.price <= 0)
      return setError("Preço inválido.");

    try {
      setIsSaving(true);

      const payload = {
        name: form.name,
        description: form.description,
        price: form.price,
        category: form.category,
        photos: form.photos,
      };

      if (editingId !== null) {
        const updated = await productsService.update(editingId, payload);
        setItems((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
        setEditingId(null);
      } else {
        const created = await productsService.create(payload);
        setItems((prev) => [created, ...prev]);
      }

      setForm(emptyForm);
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      setError(
        "Erro ao salvar produto. Verifique se você está logado como admin.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleAskDelete(id: number) {
    setProductIdToDelete(id);
    setIsDeleteDialogOpen(true);
  }

  async function handleDeleteConfirmed() {
    if (productIdToDelete === null) return;

    setError(null);

    try {
      setIsDeleting(true);

      await productsService.remove(productIdToDelete);

      setItems((prev) => prev.filter((p) => p.id !== productIdToDelete));
      setIsDeleteDialogOpen(false);
      setProductIdToDelete(null);
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      setError(
        "Erro ao excluir produto. Ele pode estar vinculado a pedidos ou você não tem permissão.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  function startEdit(p: Product) {
    setEditingId(p.id);

    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category ?? "",
      photos: Array.isArray(p.photos) ? p.photos : [],
      isFeatured: p.isFeatured ?? false,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="mx-auto max-w-[1280px] px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <Boxes className="text-primary" size={32} />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-zinc-800">Produtos</h1>
            <p className="text-xs text-zinc-500">
              Você pode anexar até {MAX_IMAGES} imagens. A primeira imagem é a
              capa.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mb-8 grid gap-3 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-3"
        >
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Nome"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary"
          />

          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm((f) => ({ ...f, price: Number(e.target.value) }))
            }
            placeholder="Preço"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary"
          />

          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={form.isFeatured || false}
              onCheckedChange={(checked) =>
                setForm((f) => ({ ...f, isFeatured: Boolean(checked) }))
              }
            />
            Destaque
          </label>

          <div className="md:col-span-3">
            <label className="mb-1 block text-xs font-medium text-zinc-700">
              Categoria
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              className={[
                "w-full rounded-md border px-3 py-2 text-sm outline-none transition",
                "focus:border-primary",
                form.category
                  ? "border-zinc-300 text-zinc-800"
                  : "border-zinc-300 text-zinc-400",
              ].join(" ")}
            >
              <option value="" disabled>
                Selecione uma categoria…
              </option>

              {MENU_ITEMS.map((item) => {
                const slug = slugFromRoute(item.route);

                return (
                  <option key={slug} value={slug}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>

          <Textarea
            value={form.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Descrição"
            className="min-h-[90px] rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary md:col-span-3"
          />

          <div className="md:col-span-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="block text-xs font-medium text-zinc-700">
                Imagens{" "}
                <span className="text-zinc-400">
                  ({form.photos.length}/{MAX_IMAGES})
                </span>
              </label>

              {form.photos.length > 0 && (
                <button
                  type="button"
                  onClick={clearImages}
                  className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                >
                  <Trash2 size={14} />
                  Limpar
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 transition hover:border-primary hover:bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200 group-hover:ring-primary/40">
                    <ImagePlus
                      className="text-zinc-600 group-hover:text-primary"
                      size={18}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-zinc-800">
                      Anexar imagens
                    </span>
                    <span className="text-xs text-zinc-500">
                      PNG/JPG/WebP • até {MAX_IMAGES}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-semibold text-primary">
                  {form.photos.length >= MAX_IMAGES
                    ? "Limite atingido"
                    : "Selecionar"}
                </span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  disabled={form.photos.length >= MAX_IMAGES}
                  onChange={async (e) => {
                    const input = e.currentTarget;
                    await handleAddImages(input.files);
                    input.value = "";
                  }}
                />
              </label>

              {form.photos.length === 0 ? (
                <div className="rounded-xl border border-zinc-200 bg-white p-4 text-xs text-zinc-500">
                  Nenhuma imagem selecionada.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {form.photos.map((src, idx) => (
                    <div
                      key={`${idx}-${src.slice(0, 20)}`}
                      className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
                    >
                      <img
                        src={src}
                        alt={`Imagem ${idx + 1}`}
                        className="h-24 w-full object-cover"
                      />

                      <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[11px] font-semibold text-white">
                        {idx + 1}
                        {idx === 0 ? " • capa" : ""}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImageAt(idx)}
                        className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm opacity-0 transition group-hover:opacity-100 hover:bg-white"
                        aria-label={`Remover imagem ${idx + 1}`}
                        title="Remover"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[11px] text-zinc-500">
                A imagem <b>1</b> é a capa.
              </p>
            </div>
          </div>

          <button
            disabled={isSaving}
            className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-3"
          >
            <Plus size={16} /> {editingId !== null ? "Salvar" : "Adicionar"}
          </button>
        </form>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                <TableHead className="px-4 py-3 text-left">Produto</TableHead>
                <TableHead className="px-4 py-3 text-left">Preço</TableHead>
                <TableHead className="px-4 py-3 text-left">Imagens</TableHead>
                <TableHead className="px-6 py-3 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    className="px-4 py-6 text-center text-sm text-zinc-500"
                    colSpan={4}
                  >
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell
                    className="px-4 py-6 text-center text-sm text-zinc-500"
                    colSpan={4}
                  >
                    Nenhum produto cadastrado.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((p) => (
                  <TableRow key={p.id} className="align-middle">
                    <TableCell
                      className="px-4 py-3 font-semibold text-zinc-800 max-w-md truncate"
                      title={p.name}
                    >
                      {p.name}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-zinc-700">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(p.price)}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {p.photos && p.photos.length > 0 ? (
                          p.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={p.name}
                              className="h-10 w-10 rounded-md border border-zinc-200 object-cover"
                            />
                          ))
                        ) : (
                          <span className="text-xs text-zinc-500">—</span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(p)}
                          className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200"
                        >
                          <Pencil size={14} /> Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAskDelete(p.id)}
                          className="inline-flex items-center gap-1 rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white hover:bg-red-600"
                        >
                          <Trash2 size={14} /> Excluir
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <button
          onClick={loadProducts}
          className="mt-4 text-xs font-semibold text-primary hover:underline"
        >
          Recarregar
        </button>

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={(open) => {
            setIsDeleteDialogOpen(open);
            if (!open && !isDeleting) {
              setProductIdToDelete(null);
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir produto</AlertDialogTitle>
              <AlertDialogDescription>
                Você deseja realmente excluir este produto? Essa ação não pode
                ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  if (isDeleting) return;
                  setIsDeleteDialogOpen(false);
                  setProductIdToDelete(null);
                }}
              >
                Cancelar
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  void handleDeleteConfirmed();
                }}
                disabled={isDeleting}
                className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
              >
                {isDeleting ? "Excluindo..." : "Excluir"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedRoute>
  );
}
