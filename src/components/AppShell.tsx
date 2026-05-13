import Link from "next/link";
import { projectRoutes } from "@/lib/implementationQa";

const routeByPath = new Map(projectRoutes.map((route) => [route.path, route]));
const primaryPaths = ["/", "/brief", "/report", "/trends", "/seo", "/import"];
const navItems = projectRoutes.map((route) => [route.path, route.label] as const);
const marqueeItems = [
  "mock/offline data",
  "China metrics separated",
  "Thai competitors manual only",
  "CSV import ready",
  "weekly growth brief",
  "browser research report"
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-30 border-b border-hairline bg-canvas">
        <div className="mx-auto flex min-h-14 max-w-[1280px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3 py-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-on-primary">
              CG
            </div>
            <div className="leading-none">
              <div className="font-display text-lg font-semibold">Cosplay Growth</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink">organic dashboard</div>
            </div>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
            {primaryPaths.map((path) => {
              const route = routeByPath.get(path);
              if (!route) return null;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className="rounded-full px-4 py-2 text-sm font-medium transition hover:bg-surface-soft"
                >
                  {route.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/tools"
              className="hidden rounded-full bg-canvas px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface-soft md:inline-flex"
            >
              เครื่องมือ
            </Link>
            <Link href="/brief" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-on-primary">
              เปิดสรุป
            </Link>
          </div>
        </div>

        <div className="bg-inverse-canvas text-inverse-ink">
          <div className="mx-auto flex h-9 max-w-[1280px] items-center gap-6 overflow-hidden px-4 font-mono text-[11px] uppercase tracking-[0.12em] sm:px-6 lg:px-8">
            {marqueeItems.map((item) => (
              <span key={item} className="shrink-0">
                {item}
              </span>
            ))}
          </div>
        </div>

        <nav className="border-t border-hairline bg-canvas">
          <div className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
            {navItems.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="whitespace-nowrap rounded-full border border-hairline bg-canvas px-3 py-1.5 text-xs font-medium text-ink transition hover:bg-surface-soft"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
