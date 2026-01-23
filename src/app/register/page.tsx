"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { registerSchema, type RegisterFormValues } from "@/lib/schemas";  
import { useAuth } from "@/context/AuthContext";

type RegisterErrors = Partial<Record<keyof RegisterFormValues, string>> & { form?: string };

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [values, setValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
  }

  function parseValidationErrors(error: z.ZodError<RegisterFormValues>): RegisterErrors {
    const fieldErrors: RegisterErrors = {};
    for (const issue of error.issues) {
      const field = issue.path[0] as keyof RegisterFormValues | undefined;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return fieldErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(parseValidationErrors(parsed.error));
      return;
    }

    try {
      setIsSubmitting(true);
      await register(parsed.data.name, parsed.data.email);
      router.push("/");
    } catch {
      setErrors({ form: "Erro ao criar conta. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <main className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-2 h-16 w-16 overflow-hidden">
            <img src="/logo.svg" alt="Busca Busca Logo" className="h-full w-full object-contain" />
          </div>
          <h1 className="mt-1 text-xl font-semibold text-zinc-800">Criar sua conta</h1>
          <p className="mt-1 text-xs text-zinc-500">Cadastre-se para aproveitar todas as ofertas.</p>
        </div>
        {errors.form && <p className="mb-3 text-xs text-red-500">{errors.form}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-xs font-medium text-zinc-700">
              Nome completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-primary/40 focus:border-primary focus:ring-2"
              placeholder="Seu nome"
            />
            {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-medium text-zinc-700">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-primary/40 focus:border-primary focus:ring-2"
              placeholder="seuemail@exemplo.com"
            />
            {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-xs font-medium text-zinc-700">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-primary/40 focus:border-primary focus:ring-2"
              placeholder="Mínimo de 6 caracteres"
            />
            {errors.password && <p className="text-[11px] text-red-500">{errors.password}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-xs font-medium text-zinc-700">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-primary/40 focus:border-primary focus:ring-2"
              placeholder="Repita a senha"
            />
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white transition-transform duration-150 hover:scale-[1.01] hover:brightness-110 disabled:cursor-not-allowed disabled:bg-zinc-300"
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

