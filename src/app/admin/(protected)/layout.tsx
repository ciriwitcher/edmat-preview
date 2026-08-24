import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin";
import { signOut } from "@/lib/actions/auth";
import { Logo } from "@/components/ui/Logo";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Realizacje", href: "/admin/realizacje" },
  { label: "Aktualności", href: "/admin/aktualnosci" },
  { label: "Promocje", href: "/admin/promocje" },
  { label: "Zapytania", href: "/admin/zapytania" },
];

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin } = await getAdminSession();

  if (!user) {
    redirect("/admin/login");
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper-alt px-4">
        <div className="max-w-md border border-line bg-white p-8 text-center">
          <h1 className="text-xl text-ink">Brak dostępu</h1>
          <p className="mt-3 text-sm text-ink-soft">
            To konto ({user.email}) jest zalogowane, ale nie ma uprawnień administratora. Skontaktuj się z osobą
            zarządzającą stroną, aby dodać Twój identyfikator do tabeli <code>admin_users</code>.
          </p>
          <form action={signOut} className="mt-6">
            <button type="submit" className="border border-ink/25 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink">
              Wyloguj się
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-paper-alt">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white lg:flex">
        <div className="border-b border-line px-6 py-6">
          <Logo />
        </div>
        <nav aria-label="Nawigacja panelu administracyjnego" className="flex-1 px-3 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2.5 text-sm font-medium text-ink hover:bg-paper-alt hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line px-6 py-4">
          <p className="truncate text-xs text-ink-faint">{user.email}</p>
          <form action={signOut} className="mt-2">
            <button type="submit" className="text-sm font-medium text-accent">
              Wyloguj się
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-line bg-white px-4 py-4 lg:hidden">
          <Logo />
          <form action={signOut}>
            <button type="submit" className="text-sm font-medium text-accent">
              Wyloguj
            </button>
          </form>
        </header>
        <nav aria-label="Nawigacja panelu (mobile)" className="flex gap-1 overflow-x-auto border-b border-line bg-white px-3 py-2 lg:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 px-3 py-2 text-sm font-medium text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1 px-4 py-8 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
