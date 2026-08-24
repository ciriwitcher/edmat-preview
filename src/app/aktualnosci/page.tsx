import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostCard } from "@/components/ui/PostCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { getPublishedPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Aktualności",
  description: "Aktualności EDMAT — nowości, zrealizowane inwestycje i informacje z życia firmy.",
  alternates: { canonical: "/aktualnosci" },
};

export default async function AktualnosciPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: "Aktualności" }]} />
        </div>
      </div>

      <section className="border-b border-line bg-paper py-12 sm:py-16">
        <div className="container-edmat max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Firma</span>
          <h1 className="mt-4 text-balance text-4xl sm:text-5xl">Aktualności</h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-soft">
            Nowości, zrealizowane inwestycje i informacje z życia firmy EDMAT.
          </p>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <div className="container-edmat">
          {posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-line p-10 text-center text-ink-soft">
              Aktualności pojawią się w tym miejscu wkrótce.
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
