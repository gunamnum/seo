import type { Platform, SourceQualityTier, SourceType, VerificationStatus } from "./types";

export type ImportType =
  | "trend_items"
  | "viral_clips"
  | "competitors"
  | "benchmark_creators"
  | "events"
  | "tools_plugins"
  | "seo_keywords"
  | "market_indicators"
  | "experiments";

export type CsvValidationResult = {
  valid: boolean;
  errors: string[];
  rows: Record<string, string>[];
};

const allowedPlatforms = new Set<Platform>([
  "tiktok",
  "instagram",
  "facebook",
  "douyin",
  "xiaohongshu",
  "bilibili",
  "weibo",
  "google_trends",
  "manual",
  "x_twitter",
  "behance",
  "artstation",
  "fivehundredpx",
  "website"
]);

const allowedSourceTypes = new Set<SourceType>([
  "official_source",
  "user_analytics_export",
  "manual_csv",
  "public_observation",
  "secondary_summary",
  "mock_seed",
  "user_provided",
  "unknown"
]);

const allowedVerificationStatuses = new Set<VerificationStatus>([
  "unverified",
  "verified",
  "needs_update",
  "needs_verification"
]);

const allowedSourceQualityTiers = new Set<SourceQualityTier>(["S", "A", "B", "C", "D"]);

export const researchMetadataColumns = [
  "source_label",
  "source_url",
  "source_type",
  "verification_status",
  "is_estimated",
  "is_user_provided",
  "source_quality_tier",
  "confidence_reason"
] as const;

function withResearchColumns(columns: string[]): string[] {
  return [...columns, ...researchMetadataColumns];
}

export const requiredColumns: Record<ImportType, string[]> = {
  trend_items: withResearchColumns(["id", "platform", "region", "trend_name", "trend_type", "collected_at"]),
  viral_clips: withResearchColumns(["id", "platform", "region", "views", "likes", "comments", "shares", "saves"]),
  competitors: withResearchColumns(["id", "display_name", "country_or_region", "main_platform"]),
  benchmark_creators: withResearchColumns(["id", "creator_display_name", "platform", "platform_group"]),
  events: withResearchColumns(["id", "event_name", "start_date", "end_date"]),
  tools_plugins: withResearchColumns(["id", "tool_name", "category", "recommendation_level"]),
  seo_keywords: withResearchColumns(["id", "platform", "language", "keyword", "search_intent"]),
  market_indicators: withResearchColumns(["id", "indicator_name", "period", "value"]),
  experiments: withResearchColumns(["id", "experiment_name", "platform", "content_type"])
};

export function validateRequiredColumns(headers: string[], type: ImportType): string[] {
  const headerSet = new Set(headers);
  return requiredColumns[type]
    .filter((column) => !headerSet.has(column))
    .map((column) => `ขาดคอลัมน์ที่ต้องมี: ${column}`);
}

export function validatePlatform(value: string): boolean {
  return allowedPlatforms.has(value as Platform);
}

function isValidUrl(value: string): boolean {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isNumeric(value: string): boolean {
  return value === "" || Number.isFinite(Number(value));
}

function isDateLike(value: string): boolean {
  if (value === "") return true;

  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day &&
    !Number.isNaN(Date.parse(value))
  );
}

function isBooleanLike(value: string): boolean {
  return ["true", "false", "1", "0", "yes", "no"].includes(value.toLowerCase());
}

export function validateCsvRows(
  type: ImportType,
  rows: Record<string, string>[]
): CsvValidationResult {
  const headers = rows[0] ? Object.keys(rows[0]) : [];
  const errors = validateRequiredColumns(headers, type);

  rows.forEach((row, index) => {
    const line = index + 2;
    const platform = row.platform ?? row.main_platform;
    if (platform && !validatePlatform(platform)) {
      errors.push(`บรรทัด ${line}: platform ไม่ถูกต้อง "${platform}"`);
    }

    ["public_url", "official_url_optional", "source_url"].forEach((field) => {
      if (row[field] && !isValidUrl(row[field])) {
        errors.push(`บรรทัด ${line}: URL ใน ${field} ไม่ถูกต้อง`);
      }
    });

    ["views", "likes", "comments", "shares", "saves", "current_metric", "previous_metric"].forEach(
      (field) => {
        if (row[field] !== undefined && !isNumeric(row[field])) {
          errors.push(`บรรทัด ${line}: ตัวเลขใน ${field} ไม่ถูกต้อง`);
        }
      }
    );

    ["collected_at", "updated_at", "start_date", "end_date", "last_verified_at"].forEach(
      (field) => {
        if (row[field] !== undefined && !isDateLike(row[field])) {
          errors.push(`บรรทัด ${line}: วันที่ใน ${field} ไม่ถูกต้อง`);
        }
      }
    );

    if (row.source_type && !allowedSourceTypes.has(row.source_type as SourceType)) {
      errors.push(`บรรทัด ${line}: source_type ไม่ถูกต้อง "${row.source_type}"`);
    }

    if (
      row.verification_status &&
      !allowedVerificationStatuses.has(row.verification_status as VerificationStatus)
    ) {
      errors.push(`บรรทัด ${line}: verification_status ไม่ถูกต้อง "${row.verification_status}"`);
    }

    if (
      row.source_quality_tier &&
      !allowedSourceQualityTiers.has(row.source_quality_tier as SourceQualityTier)
    ) {
      errors.push(`บรรทัด ${line}: source_quality_tier ไม่ถูกต้อง "${row.source_quality_tier}"`);
    }

    ["is_estimated", "is_user_provided"].forEach((field) => {
      if (row[field] && !isBooleanLike(row[field])) {
        errors.push(`บรรทัด ${line}: ค่า boolean ใน ${field} ไม่ถูกต้อง`);
      }
    });

    if (
      type === "benchmark_creators" &&
      ["douyin", "xiaohongshu", "bilibili", "weibo"].includes(row.platform) &&
      row.platform_group !== "china_mainland_platform"
    ) {
      errors.push(
        `บรรทัด ${line}: ข้อมูลแพลตฟอร์มจีนต้องใช้ platform_group = china_mainland_platform`
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    rows
  };
}

export function validateSafetyChecklist(text: string): boolean {
  const normalized = text.toLowerCase();
  const phraseGroups = [
    ["official", "ทางการ", "marketplace", "github release"],
    ["cracked", "crack"],
    ["checksum"],
    ["virustotal"],
    ["updated", "อัปเดต", "update"]
  ];
  return phraseGroups.every((phrases) => phrases.some((phrase) => normalized.includes(phrase)));
}
