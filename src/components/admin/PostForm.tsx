"use client";

import { useActionState } from "react";
import type { AdminFormState } from "@/lib/actions/admin-projects";
import type { PostRow } from "@/lib/supabase/database.types";

const initialState: AdminFormState = { status: "idle" };

export function PostForm({
  action,
  post,
  submitLabel,
}: {
  action: (prevState: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  post?: PostRow;
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
          <input id="title" name="title" required defaultValue={post?.title} className="w-full border border-line px-4 py-2.5" />
        </div>
        <div>
          <label htmlFor="slug" className="mb-1.5 block text-sm font-medium text-ink">
            Adres URL (slug)
          </label>
          <input
            id="slug"
            name="slug"
            placeholder="generowany automatycznie z tytułu, jeśli puste"
            defaultValue={post?.slug}
            className="w-full border border-line px-4 py-2.5"
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="mb-1.5 block text-sm font-medium text-ink">
          Zajawka (widoczna na liście aktualności)
        </label>
        <textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} className="w-full border border-line px-4 py-2.5" />
      </div>

      <div>
        <label htmlFor="content" className="mb-1.5 block text-sm font-medium text-ink">
          Treść (akapity oddzielaj pustą linią)
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          defaultValue={post?.content ?? ""}
          className="w-full border border-line px-4 py-2.5"
        />
      </div>

      <fieldset className="border border-line p-4">
        <legend className="px-1 text-sm font-medium text-ink">SEO</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="seoTitle" className="mb-1.5 block text-sm text-ink-soft">
              SEO title
            </label>
            <input id="seoTitle" name="seoTitle" defaultValue={post?.seo_title ?? ""} className="w-full border border-line px-4 py-2.5" />
          </div>
          <div>
            <label htmlFor="seoDescription" className="mb-1.5 block text-sm text-ink-soft">
              SEO description
            </label>
            <input id="seoDescription" name="seoDescription" defaultValue={post?.seo_description ?? ""} className="w-full border border-line px-4 py-2.5" />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="cover" className="mb-1.5 block text-sm font-medium text-ink">
          Zdjęcie okładkowe {post?.cover_image_path && "(wgraj nowe, aby zastąpić obecne)"}
        </label>
        <input
          id="cover"
          name="cover"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="w-full border border-line px-4 py-2.5 file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2 file:text-white"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} />
        Opublikowany (widoczny publicznie)
      </label>

      {state.status === "error" && state.message && <p role="alert" className="text-sm text-accent">{state.message}</p>}
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
