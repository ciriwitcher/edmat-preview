import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { categoryLabels } from "@/lib/content/categories";

export default async function AdminProjectsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: projects } = supabase
    ? await supabase
        .from("projects")
        .select("id, title, slug, category, published, sort_order, project_images(id)")
        .order("sort_order", { ascending: true })
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-ink">Realizacje</h1>
          <p className="mt-1 text-sm text-ink-soft">{projects?.length ?? 0} pozycji</p>
        </div>
        <Link href="/admin/realizacje/nowa" className="bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark">
          + Dodaj realizację
        </Link>
      </div>

      <div className="mt-8 divide-y divide-line border border-line bg-white">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <Link
              key={project.id}
              href={`/admin/realizacje/${project.id}`}
              className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper-alt"
            >
              <div>
                <p className="font-medium text-ink">{project.title}</p>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {categoryLabels[project.category as keyof typeof categoryLabels]} · {project.project_images?.length ?? 0} zdjęć
                </p>
              </div>
              <span
                className={`shrink-0 px-2.5 py-1 text-xs font-medium ${
                  project.published ? "bg-accent/10 text-accent" : "bg-ink/10 text-ink-soft"
                }`}
              >
                {project.published ? "Opublikowana" : "Szkic"}
              </span>
            </Link>
          ))
        ) : (
          <p className="px-5 py-8 text-center text-ink-soft">Brak realizacji — dodaj pierwszą.</p>
        )}
      </div>
    </div>
  );
}
