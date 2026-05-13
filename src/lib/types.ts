export type Platform =
  | "tiktok"
  | "instagram"
  | "facebook"
  | "douyin"
  | "xiaohongshu"
  | "bilibili"
  | "weibo"
  | "google_trends"
  | "manual"
  | "x_twitter"
  | "behance"
  | "artstation"
  | "fivehundredpx"
  | "website";

export type Region =
  | "thailand"
  | "japan"
  | "korea"
  | "taiwan"
  | "hong_kong"
  | "singapore"
  | "malaysia"
  | "indonesia"
  | "philippines"
  | "vietnam"
  | "mainland_china"
  | "global"
  | "other";

export type Confidence = "low" | "medium" | "high";
export type PlatformGroup = "global_platform" | "china_mainland_platform";
export type CgLevel = "none" | "light" | "medium" | "heavy";
export type SourceType =
  | "official_source"
  | "user_analytics_export"
  | "manual_csv"
  | "public_observation"
  | "secondary_summary"
  | "mock_seed"
  | "user_provided"
  | "unknown";
export type VerificationStatus = "unverified" | "verified" | "needs_update" | "needs_verification";
export type SourceQualityTier = "S" | "A" | "B" | "C" | "D";

export type ResearchMetadata = {
  source_label: string;
  source_url: string;
  source_type: SourceType;
  verification_status: VerificationStatus;
  is_mock_data: boolean;
  is_estimated: boolean;
  is_user_provided: boolean;
  source_quality_tier: SourceQualityTier;
  confidence_reason: string;
};

export type TrendItem = ResearchMetadata & {
  id: string;
  platform: Platform;
  region: Region;
  trend_name: string;
  trend_type:
    | "hashtag"
    | "sound"
    | "clip_format"
    | "character"
    | "fandom"
    | "event"
    | "keyword"
    | "visual_style";
  current_metric?: number;
  previous_metric?: number;
  velocity?: number;
  audio_format_velocity?: number;
  cross_platform_signal?: number;
  event_relevance_thailand?: number;
  visual_fit_bright_cg_cosplay?: number;
  competition_gap?: number;
  trend_score: number;
  confidence_level: Confidence;
  recommended_content_idea: string;
  notes: string;
  collected_at: string;
};

export type ViralClip = ResearchMetadata & {
  id: string;
  platform: Platform;
  region: Region;
  public_url: string;
  creator_display_name: string;
  is_competitor: boolean;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagement_rate_by_view: number;
  shareability_score: number;
  caption: string;
  hashtags: string[];
  hook_text: string;
  on_screen_text: string;
  video_length_seconds: number;
  content_type:
    | "bts"
    | "before_after"
    | "event_recap"
    | "tutorial"
    | "character_reveal"
    | "lighting_setup"
    | "retouch_timelapse"
    | "portfolio_showcase"
    | "other";
  visual_style: string;
  retouch_style: string;
  cg_level: CgLevel;
  cosplay_theme: string;
  lesson_learned: string;
  idea_to_adapt: string;
  collected_at: string;
};

export type Competitor = ResearchMetadata & {
  id: string;
  display_name: string;
  country_or_region: "thailand";
  public_url: string;
  main_platform: Platform;
  secondary_platforms: Platform[];
  competitor_group:
    | "event_album_shooter"
    | "premium_cinematic"
    | "retouch_fantasy_cg"
    | "short_form_first_creator"
    | "hybrid";
  visual_style: string;
  content_formats: string[];
  estimated_avg_views: number;
  estimated_engagement_rate: number;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threat_level: "low" | "medium" | "high";
  notes: string;
  updated_at: string;
};

export type BenchmarkCreator = ResearchMetadata & {
  id: string;
  creator_display_name: string;
  country_or_region: Region;
  platform: Platform;
  public_url: string;
  platform_group: PlatformGroup;
  content_type: string;
  visual_style: string;
  retouch_style: string;
  cg_level: CgLevel;
  average_views: number;
  engagement_rate: number;
  hook_pattern: string;
  caption_pattern: string;
  hashtag_or_keyword_pattern: string;
  strengths: string;
  weaknesses: string;
  idea_to_adapt_for_thailand: string;
  china_adaptation_notes: string;
  updated_at: string;
};

export type EventItem = ResearchMetadata & {
  id: string;
  event_name: string;
  country_or_region: Region;
  city: string;
  venue: string;
  start_date: string;
  end_date: string;
  event_type:
    | "cosplay"
    | "anime"
    | "game"
    | "idol"
    | "japanese_pop_culture"
    | "creator_market"
    | "other";
  fandom_relevance: string;
  expected_content_opportunity: string;
  recommended_pre_event_content: string;
  recommended_event_day_content: string;
  recommended_post_event_content: string;
  notes: string;
};

export type ToolPlugin = ResearchMetadata & {
  id: string;
  tool_name: string;
  category:
    | "photo_editing"
    | "raw_processing"
    | "retouch"
    | "cg"
    | "vfx"
    | "video_editing"
    | "ai_assist"
    | "portfolio"
    | "seo"
    | "analytics";
  official_source_label: string;
  official_url_optional?: string;
  price_type: "free" | "freemium" | "paid" | "open_source" | "bundled";
  estimated_price: string;
  license_type: string;
  main_use_case: string;
  why_useful_for_cosplay: string;
  safety_checklist: string;
  checksum_or_signature_available: boolean;
  virustotal_checked: "yes" | "no" | "manual";
  last_verified_at: string;
  warning_notes: string;
  recommendation_level: "recommended" | "optional" | "avoid_until_verified";
};

export type SeoKeyword = ResearchMetadata & {
  id: string;
  platform: Platform;
  language: "thai" | "english" | "chinese" | "japanese" | "korean" | "mixed";
  keyword: string;
  search_intent:
    | "booking"
    | "tutorial"
    | "inspiration"
    | "event"
    | "portfolio"
    | "retouch"
    | "cosplay_character"
    | "fandom";
  priority: number;
  recommended_caption_usage: string;
  recommended_hashtags: string[];
  recommended_on_screen_text: string;
  notes: string;
};

export type ContentIdea = ResearchMetadata & {
  id: string;
  title: string;
  platform_target: Platform;
  related_trend_id?: string;
  related_event_id?: string;
  content_type: ViralClip["content_type"];
  hook: string;
  caption_th: string;
  caption_en: string;
  hashtags: string[];
  shot_list: string[];
  retouch_notes: string;
  cg_notes: string;
  posting_window: string;
  expected_effort: "low" | "medium" | "high";
  expected_impact: "low" | "medium" | "high";
  status: "idea" | "planned" | "shooting" | "editing" | "posted" | "measured";
};

export type MarketIndicator = ResearchMetadata & {
  id: string;
  indicator_name: string;
  period: string;
  value: string;
  confidence_level: Confidence;
  interpretation: string;
  forecast_1_year: string;
  forecast_2_3_years: string;
  forecast_3_5_years: string;
  risks: string;
  opportunities: string;
  updated_at: string;
};

export type Experiment = ResearchMetadata & {
  id: string;
  experiment_name: string;
  hypothesis: string;
  platform: Platform;
  content_type: ViralClip["content_type"];
  variant_a: string;
  variant_b: string;
  start_date: string;
  end_date: string;
  views_a: number;
  views_b: number;
  engagement_rate_a: number;
  engagement_rate_b: number;
  winner: string;
  lesson: string;
  next_action: string;
};
