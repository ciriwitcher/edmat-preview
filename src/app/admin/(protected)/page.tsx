import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { projects: 0, posts: 0, promotions: 0, submissions: 0 };

  const [projects, posts, promotions, submissions] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("promotions").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
  ]);

  return {
    projects: projects.count ?? 0,
    posts: posts.count ?? 0,
    promotions: promotions.count ?? 0,
    submissions: submissions.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    { label: "Realizacje", value: counts.projects, href: "/admin/realizacje" },
    { label: "Aktualności", value: counts.posts, href: "/admin/aktualnosci" },
    { label: "Promocje", value: counts.promotions, href: "/admin/promocje" },
    { label: "Zapytania z formularza", value: counts.submissions, href: "/admin/zapytania" },
  ];

  return (
    <div>
      <h1 className="text-2xl text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">Szybki przegląd treści na stronie.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="border border-line bg-white p-6 hover:border-accent">
            <p className="text-sm text-ink-soft">{card.label}</p>
            <p className="mt-2 font-display text-3xl text-ink">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-line bg-white p-6">
        <h2 className="text-lg text-ink">Szybkie akcje</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/realizacje/nowa" className="border border-ink/25 px-4 py-2.5 text-sm font-medium text-ink hover:border-ink">
            + Dodaj realizację
          </Link>
          <Link href="/admin/aktualnosci/nowa" className="border border-ink/25 px-4 py-2.5 text-sm font-medium text-ink hover:border-ink">
            + Dodaj aktualność
          </Link>
          <Link href="/admin/promocje/nowa" className="border border-ink/25 px-4 py-2.5 text-sm font-medium text-ink hover:border-ink">
            + Dodaj promocję
          </Link>
        </div>
      </div>
    </div>
  );
}
