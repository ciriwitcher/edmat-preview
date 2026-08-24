import Link from "next/link";
import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { DeleteEntityButton } from "@/components/admin/DeleteEntityButton";
import { deletePost, updatePost } from "@/lib/actions/admin-posts";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: post } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!post) notFound();

  const updatePostWithId = updatePost.bind(null, id);
  const deletePostWithId = deletePost.bind(null, id);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/aktualnosci" className="text-sm text-ink-soft hover:text-accent">
          ← Wszystkie aktualności
        </Link>
        <DeleteEntityButton action={deletePostWithId} confirmMessage={`Usunąć wpis "${post.title}"? Tej operacji nie można cofnąć.`} />
      </div>
      <h1 className="mt-3 text-2xl text-ink">{post.title}</h1>
      <div className="mt-6 border border-line bg-white p-6">
        <PostForm action={updatePostWithId} post={post} submitLabel="Zapisz zmiany" />
      </div>
    </div>
  );
}
