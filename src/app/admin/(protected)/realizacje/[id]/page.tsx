import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ProjectImageManager } from "@/components/admin/ProjectImageManager";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { deleteProject, updateProject } from "@/lib/actions/admin-projects";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: project } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (!project) notFound();

  const { data: images } = await supabase
    .from("project_images")
    .select("id, storage_path, alt_text")
    .eq("project_id", id)
    .order("sort_order", { ascending: true });

  const updateProjectWithId = updateProject.bind(null, id);
  const deleteProjectWithId = deleteProject.bind(null, id);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/realizacje" className="text-sm text-ink-soft hover:text-accent">
          ← Wszystkie realizacje
        </Link>
        <DeleteEntityButton
          action={deleteProjectWithId}
          confirmMessage={`Usunąć realizację "${project.title}" wraz ze wszystkimi zdjęciami? Tej operacji nie można cofnąć.`}
        />
      </div>

      <h1 className="mt-3 text-2xl text-ink">{project.title}</h1>

      <div className="mt-6 border border-line bg-white p-6">
        <ProjectForm action={updateProjectWithId} project={project} submitLabel="Zapisz zmiany" />
      </div>

      <div className="mt-8">
        <h2 className="text-lg text-ink">Zdjęcia</h2>
        <div className="mt-4">
          <ProjectImageManager projectId={id} images={images ?? []} coverPath={project.cover_image_path} />
        </div>
      </div>
    </div>
  );
}
