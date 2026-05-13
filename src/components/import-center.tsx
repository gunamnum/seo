"use client";

import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";
import { requiredColumns, type ImportType, validateCsvRows } from "@/lib/csv";
import {
  IMPORT_STORE_KEY,
  createImportBatch,
  emptyImportStoreState,
  mergeImportState,
  parseImportStoreState,
  stringifyImportStoreState,
  summarizeImportState
} from "@/lib/importStore";
import { labelImportType } from "@/lib/thaiLabels";
import { Badge, EmptyState, Panel, SimpleTable } from "./ui";

const importTypes = Object.keys(requiredColumns) as ImportType[];
const inputClass =
  "rounded-[8px] border border-hairline bg-canvas px-4 py-3 text-base text-ink outline-none focus:ring-2 focus:ring-primary/20";
const noteClass = "rounded-[24px] bg-surface-soft p-4 text-sm leading-6 text-ink";

export function ImportCenter() {
  const [type, setType] = useState<ImportType>("trend_items");
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [storeState, setStoreState] = useState(emptyImportStoreState);
  const [storageStatus, setStorageStatus] = useState("ข้อมูลที่บันทึกจะโหลดจาก browser เครื่องนี้เท่านั้น");
  const result = useMemo(() => validateCsvRows(type, rows), [rows, type]);
  const summary = useMemo(() => summarizeImportState(storeState), [storeState]);
  const canPersist = rows.length > 0 && result.valid;
  const hasStoredImports = storeState.records.length > 0;

  useEffect(() => {
    try {
      setStoreState(parseImportStoreState(window.localStorage.getItem(IMPORT_STORE_KEY)));
    } catch {
      setStorageStatus("โหลดข้อมูลนำเข้าที่บันทึกไว้จาก localStorage ไม่ได้");
    }
  }, []);

  function persistRows() {
    if (!canPersist) return;

    try {
      const batch = createImportBatch({
        type,
        rows,
        importedAt: new Date().toISOString(),
        importId: `import-${Date.now()}-${type}`
      });
      const nextState = mergeImportState(storeState, batch);
      window.localStorage.setItem(IMPORT_STORE_KEY, stringifyImportStoreState(nextState));
      setStoreState(nextState);
      setStorageStatus(`บันทึก ${rows.length} แถวไว้ใน localStorage แล้ว`);
    } catch {
      setStorageStatus("บันทึกแถวนำเข้าไว้ใน localStorage ไม่ได้");
    }
  }

  function clearStoredImports() {
    try {
      window.localStorage.removeItem(IMPORT_STORE_KEY);
      setStoreState(emptyImportStoreState);
      setStorageStatus("ล้างข้อมูลนำเข้าที่บันทึกไว้ใน browser นี้แล้ว");
    } catch {
      setStorageStatus("ล้างข้อมูลนำเข้าใน localStorage ไม่ได้");
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
      <Panel title="นำเข้า CSV">
        <div className="space-y-4">
          <label className="grid gap-2 text-sm font-bold">
            ประเภทข้อมูล
            <select className={inputClass} value={type} onChange={(event) => setType(event.target.value as ImportType)}>
              {importTypes.map((item) => (
                <option key={item} value={item}>
                  {labelImportType(item)}
                </option>
              ))}
            </select>
          </label>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">คอลัมน์ที่ต้องมี</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {requiredColumns[type].map((column) => (
                <Badge key={column} tone="blue">
                  {column}
                </Badge>
              ))}
            </div>
          </div>
          <input
            type="file"
            accept=".csv,text/csv"
            className="block w-full rounded-[24px] border border-dashed border-hairline bg-surface-soft p-5 text-sm text-ink"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              Papa.parse<Record<string, string>>(file, {
                header: true,
                skipEmptyLines: true,
                complete: (parsed) => setRows(parsed.data),
                transform: (value) => value.trim()
              });
            }}
          />
          <div className={result.valid ? "rounded-[24px] bg-block-mint p-4 text-sm text-ink" : "rounded-[24px] bg-block-pink p-4 text-sm text-ink"}>
            {rows.length === 0
              ? "อัปโหลด CSV เพื่อเริ่มตรวจ"
              : result.valid
                ? `ตัวอย่างผ่าน: ${rows.length} แถว กดบันทึกลงเครื่องเพื่อเก็บไว้`
                : `พบข้อผิดพลาด ${result.errors.length} รายการ`}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-on-primary disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-muted-soft"
              disabled={!canPersist}
              onClick={persistRows}
            >
              บันทึกลงเครื่องนี้
            </button>
            <button
              type="button"
              className="rounded-full border border-hairline bg-canvas px-5 py-2.5 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:text-muted-soft"
              disabled={!hasStoredImports}
              onClick={clearStoredImports}
            >
              ล้างข้อมูลที่บันทึก
            </button>
          </div>
          <div className={noteClass}>{storageStatus}</div>
        </div>
      </Panel>
      <Panel title="ตัวอย่างและข้อผิดพลาด">
        {rows.length === 0 ? (
          <EmptyState title="ยังไม่มี CSV" detail="เลือกประเภทข้อมูล แล้วอัปโหลดไฟล์ CSV" />
        ) : (
          <div className="space-y-4">
            {result.errors.length > 0 ? (
              <div className="rounded-[24px] bg-block-pink p-4 text-sm text-ink">
                {result.errors.map((error) => (
                  <div key={error}>{error}</div>
                ))}
              </div>
            ) : null}
            <SimpleTable
              columns={Object.keys(rows[0]).slice(0, 8)}
              rows={rows.slice(0, 6).map((row) => {
                const cells: Record<string, string> = {};
                Object.keys(row)
                  .slice(0, 8)
                  .forEach((key) => {
                    cells[key] = row[key];
                  });
                return cells;
              })}
            />
          </div>
        )}
      </Panel>
      <Panel title="ข้อมูลนำเข้าที่บันทึกไว้">
        {summary.totalRecords === 0 ? (
          <EmptyState title="ยังไม่มีข้อมูลบันทึก" detail="แถว CSV ที่ตรวจผ่านสามารถบันทึกไว้ใน browser นี้ด้วย localStorage" />
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-[24px] bg-block-lime p-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">รอบนำเข้า</div>
                <div className="mt-2 text-2xl font-black">{summary.totalImports}</div>
              </div>
              <div className="rounded-[24px] bg-block-lilac p-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">แถวที่บันทึก</div>
                <div className="mt-2 text-2xl font-black">{summary.totalRecords}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {importTypes
                .filter((item) => summary.byType[item])
                .map((item) => (
                  <Badge key={item} tone="purple">
                    {labelImportType(item)}: {summary.byType[item]}
                  </Badge>
                ))}
            </div>
            <SimpleTable
              columns={["ประเภท", "แถว", "แหล่งที่มา", "นำเข้าเมื่อ"]}
              rows={storeState.history.slice(0, 8).map((item) => ({
                ประเภท: <Badge tone="blue">{labelImportType(item.import_type)}</Badge>,
                แถว: item.row_count,
                แหล่งที่มา: item.source_label,
                นำเข้าเมื่อ: new Date(item.imported_at).toLocaleString()
              }))}
            />
          </div>
        )}
      </Panel>
    </div>
  );
}
