import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/admin-projects";

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin/realizacje" className="text-sm text-ink-soft hover:text-accent">
        ← Wszystkie realizacje
      </Link>
      <h1 className="mt-3 text-2xl text-ink">Nowa realizacja</h1>

      <div className="mt-6 border border-line bg-white p-6">
        <ProjectForm action={createProject} submitLabel="Utwórz realizację" />
      </div>
    </div>
  );
}
