"use client";

import { useActionState } from "react";
import { signIn, type LoginFormState } from "@/lib/actions/auth";
import { Logo } from "@/components/ui/Logo";

const initialState: LoginFormState = { status: "idle" };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-alt px-4">
      <div className="w-full max-w-sm border border-line bg-white p-8">
        <Logo />
        <h1 className="mt-6 text-2xl">Panel administracyjny</h1>
        <p className="mt-1 text-sm text-ink-soft">Zaloguj się, aby zarządzać treścią strony.</p>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-line px-4 py-3 focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              Hasło
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-line px-4 py-3 focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>

          {state.status === "error" && state.message && (
            <p role="alert" className="text-sm text-accent">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 inline-flex items-center justify-center bg-accent px-6 py-3 text-base font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
          >
            {isPending ? "Logowanie…" : "Zaloguj się"}
          </button>
        </form>
      </div>
    </div>
  );
}
