"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cep: string;
  address: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cep: "",
    address: "",
    street: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  async function handleCepBlur() {
    const cep = form.cep.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      setIsLoadingCep(true);
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        setError("CEP não encontrado.");
        return;
      }

      setForm((prev) => ({
        ...prev,
        street: data.logradouro ?? "",
        neighborhood: data.bairro ?? "",
        city: data.localidade ?? "",
        state: data.uf ?? "",
        address: data.logradouro ?? "",
      }));
    } catch {
      setError("Erro ao buscar CEP.");
    } finally {
      setIsLoadingCep(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setIsSubmitting(true);

      await register(
        form.name,
        form.email,
        form.password,
        form.cep,
        form.address,
        form.street,
        form.complement,
        form.neighborhood,
        form.city,
        form.state,
      );

      router.push("/login");
    } catch {
      setError("Erro ao criar conta.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <main className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-xl font-semibold text-zinc-800">
          Criar conta
        </h1>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Nome completo"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="Senha"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="Confirmar senha"
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((p) => ({ ...p, confirmPassword: e.target.value }))
            }
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />

          <input
            placeholder="CEP"
            value={form.cep}
            onChange={(e) => setForm((p) => ({ ...p, cep: e.target.value }))}
            onBlur={handleCepBlur}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          <input
            placeholder={isLoadingCep ? "Buscando CEP..." : "Endereço"}
            value={form.address}
            onChange={(e) =>
              setForm((p) => ({ ...p, address: e.target.value }))
            }
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />

          <input
            placeholder="Rua"
            value={form.street}
            onChange={(e) => setForm((p) => ({ ...p, street: e.target.value }))}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="Complemento"
            value={form.complement}
            onChange={(e) =>
              setForm((p) => ({ ...p, complement: e.target.value }))
            }
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />

          <input
            placeholder="Bairro"
            value={form.neighborhood}
            onChange={(e) =>
              setForm((p) => ({ ...p, neighborhood: e.target.value }))
            }
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="Cidade"
            value={form.city}
            onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />

          <input
            placeholder="UF"
            value={form.state}
            onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 rounded-full bg-primary py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isSubmitting ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-500">
          Já tem uma conta?
          <Link href="/login" className="ml-1 font-semibold text-primary">
            Entrar
          </Link>
        </p>
      </main>
    </div>
  );
}
