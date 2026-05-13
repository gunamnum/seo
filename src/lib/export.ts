export function toCsv(rows: Array<Record<string, unknown>>): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) => {
    const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  };
  return [headers.join(","), ...rows.map((row) => headers.map((key) => escape(row[key])).join(","))].join(
    "\n"
  );
}
