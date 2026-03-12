"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, Save, Pencil, X, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type ProfileForm = {
  name: string;
  email: string;
  cep: string;
  address: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export default function MyProfilePage() {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    cep: "",
    address: "",
    street: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name ?? "",
      email: user.email ?? "",
      cep: user.cep ?? "",
      address: user.address ?? "",
      street: user.street ?? "",
      complement: user.complement ?? "",
      neighborhood: user.neighborhood ?? "",
      city: user.city ?? "",
      state: user.state ?? "",
    });
  }, [user]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleCepBlur() {
    const cep = form.cep.replace(/\D/g, "");

    if (cep.length !== 8) return;

    try {
      setError(null);
      setIsLoadingCep(true);

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado.");
        return;
      }

      setForm((current) => ({
        ...current,
        cep,
        address: data.logradouro ?? current.address,
        street: data.logradouro ?? current.street,
        neighborhood: data.bairro ?? current.neighborhood,
        city: data.localidade ?? current.city,
        state: data.uf ?? current.state,
      }));
    } catch {
      setError("Não foi possível buscar o CEP.");
    } finally {
      setIsLoadingCep(false);
    }
  }

  function handleCancelEdit() {
    if (!user) return;

    setError(null);
    setSuccess(null);
    setIsEditing(false);

    setForm({
      name: user.name ?? "",
      email: user.email ?? "",
      cep: user.cep ?? "",
      address: user.address ?? "",
      street: user.street ?? "",
      complement: user.complement ?? "",
      neighborhood: user.neighborhood ?? "",
      city: user.city ?? "",
      state: user.state ?? "",
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name.trim()) {
      setError("Nome é obrigatório.");
      return;
    }

    if (!form.email.trim()) {
      setError("E-mail é obrigatório.");
      return;
    }

    updateProfile({
      name: form.name,
      email: form.email,
      cep: form.cep,
      address: form.address,
      street: form.street,
      complement: form.complement,
      neighborhood: form.neighborhood,
      city: form.city,
      state: form.state,
    });

    setSuccess("Dados atualizados com sucesso.");
    setIsEditing(false);
  }

  const fullAddress = [
    user?.address,
    user?.street,
    user?.complement,
    user?.neighborhood,
    user?.city,
    user?.state,
    user?.cep,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <User className="text-primary" size={32} />
        <h1 className="text-2xl font-bold text-zinc-800">Meu Perfil</h1>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-zinc-800">Dados Pessoais</h2>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => {
                  setSuccess(null);
                  setError(null);
                  setIsEditing(true);
                }}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
              >
                <Pencil size={16} />
                Editar meus dados
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                <X size={16} />
                Cancelar
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">Nome</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary disabled:bg-zinc-50 disabled:text-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                E-mail
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary disabled:bg-zinc-50 disabled:text-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">CEP</label>
              <div className="relative">
                <input
                  name="cep"
                  value={form.cep}
                  onChange={handleChange}
                  onBlur={isEditing ? handleCepBlur : undefined}
                  disabled={!isEditing}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary disabled:bg-zinc-50 disabled:text-zinc-500"
                />
                {isLoadingCep && (
                  <Loader2
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-zinc-400"
                  />
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                Endereço
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary disabled:bg-zinc-50 disabled:text-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">Rua</label>
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary disabled:bg-zinc-50 disabled:text-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                Complemento
              </label>
              <input
                name="complement"
                value={form.complement}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary disabled:bg-zinc-50 disabled:text-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                Bairro
              </label>
              <input
                name="neighborhood"
                value={form.neighborhood}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary disabled:bg-zinc-50 disabled:text-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">
                Cidade
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary disabled:bg-zinc-50 disabled:text-zinc-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700">UF</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-primary disabled:bg-zinc-50 disabled:text-zinc-500"
              />
            </div>

            {isEditing && (
              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/90"
                >
                  <Save size={16} />
                  Salvar alterações
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-800">
              <Package size={18} /> Meus Pedidos
            </h2>
            <p className="text-sm text-zinc-600">
              Acompanhe seus pedidos em tempo real.
            </p>
            <Link
              href="/my-orders"
              className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
            >
              Ver meus pedidos
            </Link>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-800">
              <MapPin size={18} /> Resumo do endereço
            </h2>

            <div className="space-y-2 text-sm text-zinc-600">
              <p>
                <span className="font-semibold text-zinc-800">Nome:</span>{" "}
                {user?.name || "Não informado"}
              </p>
              <p>
                <span className="font-semibold text-zinc-800">E-mail:</span>{" "}
                {user?.email || "Não informado"}
              </p>
              <p>
                <span className="font-semibold text-zinc-800">Endereço:</span>{" "}
                {fullAddress || "Não informado"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
