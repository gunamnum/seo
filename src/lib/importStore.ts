import type { ImportType } from "./csv";

export const IMPORT_STORE_KEY = "cosplay-growth.import-store.v1";

export type StoredImportRecord = {
  import_id: string;
  import_type: ImportType;
  imported_at: string;
  row: Record<string, string>;
};

export type ImportHistoryEntry = {
  import_id: string;
  import_type: ImportType;
  imported_at: string;
  row_count: number;
  source_label: string;
};

export type ImportBatch = {
  records: StoredImportRecord[];
  history: ImportHistoryEntry;
};

export type ImportStoreState = {
  records: StoredImportRecord[];
  history: ImportHistoryEntry[];
};

export const emptyImportStoreState: ImportStoreState = {
  records: [],
  history: []
};

export function createImportBatch({
  type,
  rows,
  importedAt,
  importId = `import-${Date.now()}`
}: {
  type: ImportType;
  rows: Record<string, string>[];
  importedAt: string;
  importId?: string;
}): ImportBatch {
  const records = rows.map((row) => ({
    import_id: importId,
    import_type: type,
    imported_at: importedAt,
    row: {
      ...row,
      is_mock_data: "false",
      is_user_provided: row.is_user_provided || "true"
    }
  }));

  return {
    records,
    history: {
      import_id: importId,
      import_type: type,
      imported_at: importedAt,
      row_count: rows.length,
      source_label: rows[0]?.source_label || "Imported CSV"
    }
  };
}

export function mergeImportState(state: ImportStoreState, batch: ImportBatch): ImportStoreState {
  return {
    records: [...state.records, ...batch.records],
    history: [batch.history, ...state.history]
  };
}

export function summarizeImportState(state: ImportStoreState) {
  const byType = state.records.reduce<Partial<Record<ImportType, number>>>((acc, record) => {
    acc[record.import_type] = (acc[record.import_type] ?? 0) + 1;
    return acc;
  }, {});

  return {
    totalImports: state.history.length,
    totalRecords: state.records.length,
    byType
  };
}

export function parseImportStoreState(raw: string | null): ImportStoreState {
  if (!raw) return emptyImportStoreState;
  try {
    const parsed = JSON.parse(raw) as ImportStoreState;
    if (!Array.isArray(parsed.records) || !Array.isArray(parsed.history)) {
      return emptyImportStoreState;
    }
    return parsed;
  } catch {
    return emptyImportStoreState;
  }
}

export function stringifyImportStoreState(state: ImportStoreState): string {
  return JSON.stringify(state);
}
