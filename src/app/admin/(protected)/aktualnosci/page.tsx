import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminPostsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: posts } = supabase
    ? await supabase.from("posts").select("id, title, published, published_at").order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-ink">Aktualności</h1>
          <p className="mt-1 text-sm text-ink-soft">{posts?.length ?? 0} wpisów</p>
        </div>
        <Link href="/admin/aktualnosci/nowa" className="bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark">
          + Dodaj wpis
        </Link>
      </div>

      <div className="mt-8 divide-y divide-line border border-line bg-white">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.id} href={`/admin/aktualnosci/${post.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper-alt">
              <p className="font-medium text-ink">{post.title}</p>
              <span className={`shrink-0 px-2.5 py-1 text-xs font-medium ${post.published ? "bg-accent/10 text-accent" : "bg-ink/10 text-ink-soft"}`}>
                {post.published ? "Opublikowany" : "Szkic"}
              </span>
            </Link>
          ))
        ) : (
          <p className="px-5 py-8 text-center text-ink-soft">Brak wpisów — dodaj pierwszy.</p>
        )}
      </div>
    </div>
  );
}
