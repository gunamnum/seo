import { describe, expect, it } from "vitest";
import {
  createImportBatch,
  emptyImportStoreState,
  mergeImportState,
  parseImportStoreState,
  summarizeImportState
} from "./importStore";

const row = {
  id: "trend-1",
  platform: "tiktok",
  region: "thailand",
  trend_name: "Manual trend",
  trend_type: "keyword",
  collected_at: "2026-05-13",
  source_label: "User CSV",
  source_url: "https://example.com/source",
  source_type: "manual_csv",
  verification_status: "needs_verification",
  is_estimated: "false",
  is_user_provided: "true",
  is_mock_data: "true",
  source_quality_tier: "A",
  confidence_reason: "User-owned analytics export."
};

describe("import store helpers", () => {
  it("creates stored records and marks imported rows as not mock data", () => {
    const batch = createImportBatch({
      type: "trend_items",
      rows: [row],
      importedAt: "2026-05-13T00:00:00.000Z",
      importId: "import-1"
    });

    expect(batch.history.row_count).toBe(1);
    expect(batch.records[0].import_type).toBe("trend_items");
    expect(batch.records[0].row.is_mock_data).toBe("false");
    expect(batch.records[0].row.is_user_provided).toBe("true");
  });

  it("merges records and summarizes by import type", () => {
    const batch = createImportBatch({
      type: "trend_items",
      rows: [row, { ...row, id: "trend-2" }],
      importedAt: "2026-05-13T00:00:00.000Z",
      importId: "import-1"
    });
    const state = mergeImportState(emptyImportStoreState, batch);
    const summary = summarizeImportState(state);

    expect(state.history).toHaveLength(1);
    expect(state.records).toHaveLength(2);
    expect(summary.totalImports).toBe(1);
    expect(summary.totalRecords).toBe(2);
    expect(summary.byType.trend_items).toBe(2);
  });

  it("parses missing or corrupted storage safely", () => {
    expect(parseImportStoreState(null)).toEqual(emptyImportStoreState);
    expect(parseImportStoreState("not-json")).toEqual(emptyImportStoreState);
  });
});
