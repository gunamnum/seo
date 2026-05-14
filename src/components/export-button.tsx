"use client";

import { useState } from "react";
import { toCsv } from "@/lib/export";

export function ExportButton({
  rows,
  filename
}: {
  rows: Array<Record<string, unknown>>;
  filename: string;
}) {
  const disabled = rows.length === 0;
  const [status, setStatus] = useState("");

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition hover:bg-cta-hover disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-muted-soft"
        disabled={disabled}
        aria-describedby={`export-status-${filename}`}
        aria-label={`ส่งออก ${filename}`}
        onClick={async () => {
          if (disabled) return;

          const csv = toCsv(rows);
          let copied = false;

          try {
            await navigator.clipboard.writeText(csv);
            copied = true;
          } catch {
            copied = false;
          }

          const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.setTimeout(() => URL.revokeObjectURL(url), 0);
          setStatus(copied ? `เตรียมไฟล์ ${filename} แล้ว และคัดลอก CSV ไว้ใน clipboard` : `เตรียมไฟล์ ${filename} แล้ว`);
        }}
      >
        ส่งออก CSV
      </button>
      <span id={`export-status-${filename}`} className="min-h-5 text-xs leading-5 text-ink" aria-live="polite">
        {disabled ? "ยังไม่มีข้อมูลให้ส่งออก" : status}
      </span>
    </div>
  );
}
