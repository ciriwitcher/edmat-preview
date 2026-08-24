import Link from "next/link";
import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "@/lib/actions/admin-posts";

export default function NewPostPage() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin/aktualnosci" className="text-sm text-ink-soft hover:text-accent">
        ← Wszystkie aktualności
      </Link>
      <h1 className="mt-3 text-2xl text-ink">Nowy wpis</h1>
      <div className="mt-6 border border-line bg-white p-6">
        <PostForm action={createPost} submitLabel="Utwórz wpis" />
      </div>
    </div>
  );
}
