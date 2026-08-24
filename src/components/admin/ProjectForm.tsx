"use client";

import { useActionState } from "react";
import type { AdminFormState } from "@/lib/actions/admin-projects";
import { categoryLabels } from "@/lib/content/categories";
import type { ProjectRow } from "@/lib/supabase/database.types";

const initialState: AdminFormState = { status: "idle" };

export function ProjectForm({
  action,
  project,
  submitLabel,
}: {
  action: (prevState: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  project?: ProjectRow;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink">
            Tytuł
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={project?.title}
            className="w-full border border-line px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-accent"
          />
        </div>
        <div>
          <label htmlFor="slug" className="mb-1.5 block text-sm font-medium text-ink">
            Adres URL (slug)
          </label>
          <input
            id="slug"
            name="slug"
            placeholder="generowany automatycznie z tytułu, jeśli puste"
            defaultValue={project?.slug}
            className="w-full border border-line px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-accent"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-ink">
            Kategoria
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={project?.category ?? ""}
            className="w-full border border-line px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <option value="" disabled>
              Wybierz kategorię
            </option>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-ink">
            Lokalizacja (opcjonalnie)
          </label>
          <input
            id="location"
            name="location"
            defaultValue={project?.location ?? ""}
            className="w-full border border-line px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
          Opis
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={project?.description ?? ""}
          className="w-full border border-line px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-accent"
        />
      </div>

      <fieldset className="border border-line p-4">
        <legend className="px-1 text-sm font-medium text-ink">SEO</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="seoTitle" className="mb-1.5 block text-sm text-ink-soft">
              SEO title
            </label>
            <input id="seoTitle" name="seoTitle" defaultValue={project?.seo_title ?? ""} className="w-full border border-line px-4 py-2.5" />
          </div>
          <div>
            <label htmlFor="seoDescription" className="mb-1.5 block text-sm text-ink-soft">
              SEO description
            </label>
            <input
              id="seoDescription"
              name="seoDescription"
              defaultValue={project?.seo_description ?? ""}
              className="w-full border border-line px-4 py-2.5"
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="images" className="mb-1.5 block text-sm font-medium text-ink">
          {project ? "Dodaj kolejne zdjęcia" : "Zdjęcia (pierwsze stanie się okładką)"}
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="w-full border border-line px-4 py-2.5 file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2 file:text-white"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="published" defaultChecked={project?.published ?? false} />
        Opublikowana (widoczna publicznie)
      </label>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-accent">
          {state.message}
        </p>
      )}
      {state.status === "success" && state.message && <p className="text-sm text-accent">{state.message}</p>}

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-60"
        >
          {isPending ? "Zapisywanie…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
