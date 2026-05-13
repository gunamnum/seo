"use client";

import { toCsv } from "@/lib/export";

export function ExportButton({
  rows,
  filename
}: {
  rows: Array<Record<string, unknown>>;
  filename: string;
}) {
  const disabled = rows.length === 0;

  return (
    <button
      className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition hover:bg-cta-hover disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-muted-soft"
      disabled={disabled}
      aria-label={`ส่งออก ${filename}`}
      onClick={() => {
        const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 0);
      }}
    >
      ส่งออก CSV
    </button>
  );
}
