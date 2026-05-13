import type { ReactNode } from "react";

const pageHeaderBlocks = [
  "bg-block-lime",
  "bg-block-lilac",
  "bg-block-cream",
  "bg-block-mint",
  "bg-block-pink",
  "bg-block-coral"
];

function blockForTitle(title: string) {
  const hash = Array.from(title).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return pageHeaderBlocks[hash % pageHeaderBlocks.length];
}

export function PageHeader({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  const blockColor = blockForTitle(title);

  return (
    <header className={`mb-10 overflow-hidden rounded-[24px] ${blockColor} p-8 text-ink sm:p-10 lg:p-12`}>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-5 font-mono text-[12px] uppercase tracking-[0.14em]">Organic Cosplay Growth</div>
          <h2 className="font-display max-w-5xl text-4xl font-normal leading-none tracking-normal text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg font-normal leading-7 tracking-normal text-ink sm:text-xl">{description}</p>
        </div>
        {children ? <div className="flex shrink-0 flex-wrap gap-3">{children}</div> : null}
      </div>
    </header>
  );
}

export function Panel({
  title,
  children,
  action
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-hairline bg-canvas p-6 shadow-none">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold leading-tight tracking-normal text-ink">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export function KpiCard({
  label,
  value,
  detail,
  accent = "berry"
}: {
  label: string;
  value: string;
  detail: string;
  accent?: "berry" | "aqua" | "sun" | "violet";
}) {
  const colors = {
    berry: "bg-block-lime",
    aqua: "bg-block-mint",
    sun: "bg-block-cream",
    violet: "bg-block-lilac"
  };
  return (
    <div className={`rounded-[24px] p-6 text-ink ${colors[accent]}`}>
      <div className="font-mono text-[11px] uppercase tracking-[0.14em]">{label}</div>
      <div className="mt-5 break-words font-display text-4xl font-normal leading-none tracking-normal text-ink">{value}</div>
      <div className="mt-4 text-base font-normal leading-6 text-ink">{detail}</div>
    </div>
  );
}

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: string }) {
  const palette: Record<string, string> = {
    slate: "bg-surface-soft text-ink",
    green: "bg-block-mint text-ink",
    amber: "bg-block-cream text-ink",
    red: "bg-block-pink text-ink",
    blue: "bg-block-lilac text-ink",
    purple: "bg-block-lilac text-ink",
    pink: "bg-block-coral text-ink"
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${palette[tone] ?? palette.slate}`}>
      {children}
    </span>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const tone = score >= 80 ? "green" : score >= 60 ? "amber" : "red";
  return <Badge tone={tone}>{score}/100</Badge>;
}

export function SimpleTable({
  columns,
  rows
}: {
  columns: string[];
  rows: Array<Record<string, ReactNode>>;
}) {
  return (
    <div className="overflow-x-auto rounded-[24px] border border-hairline bg-canvas">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-hairline bg-surface-soft font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
            {columns.map((column) => (
              <th key={column} className="px-4 py-4 font-normal">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-hairline-soft bg-canvas align-top transition hover:bg-surface-soft last:border-none">
              {columns.map((column) => (
                <td key={column} className="px-4 py-4 text-base leading-7 text-ink">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-[24px] border border-dashed border-hairline bg-block-cream p-8 text-center text-ink">
      <div className="text-xl font-semibold">{title}</div>
      <div className="mt-2 text-base leading-6">{detail}</div>
    </div>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return <div className="mb-5 flex flex-wrap gap-3 rounded-[24px] bg-surface-soft p-4">{children}</div>;
}
