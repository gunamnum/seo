export type QaStatus = "pass" | "warn" | "fail";
export type VerificationStatus = "passed" | "not_run" | "failed";

export type ProjectRoute = {
  path: string;
  label: string;
  pageFile: string;
  purpose: string;
};

export type UxFeatureCheck = {
  id: string;
  label: string;
  route: string;
  evidence: string;
  status: QaStatus;
};

export type VerificationResult = {
  command: string;
  status: VerificationStatus;
  evidence: string;
};

export type ImplementationQaInput = {
  routes: ProjectRoute[];
  existingPageFiles: string[];
  navigationPaths: string[];
  featureChecks: UxFeatureCheck[];
  visibleLabels: string[];
  verification: VerificationResult[];
  remainingLimitations: string[];
};

export type ImplementationQaReport = {
  routeCoverage: {
    totalRequiredRoutes: number;
    existingRoutes: number;
    missingRoutes: string[];
    missingNavigationRoutes: string[];
    routes: Array<ProjectRoute & { exists: boolean; inNavigation: boolean }>;
  };
  featureCoverage: {
    totalChecks: number;
    passedChecks: number;
    warningChecks: number;
    failedChecks: number;
    rows: UxFeatureCheck[];
  };
  labelCoverage: {
    requiredLabels: string[];
    visibleLabels: string[];
    missingLabels: string[];
  };
  verification: VerificationResult[];
  remainingLimitations: string[];
  finalGate: QaStatus;
};

export const projectRoutes: ProjectRoute[] = [
  {
    path: "/",
    label: "หน้าแรก",
    pageFile: "app/page.tsx",
    purpose: "ภาพรวมรายสัปดาห์ KPI งานที่ควรทำ และคำแนะนำที่มีป้ายกำกับหลักฐาน"
  },
  {
    path: "/brief",
    label: "สรุปสัปดาห์",
    pageFile: "app/brief/page.tsx",
    purpose: "สรุป Growth Brief รายสัปดาห์ตามรูปแบบของโปรเจกต์"
  },
  {
    path: "/quality",
    label: "คุณภาพข้อมูล",
    pageFile: "app/quality/page.tsx",
    purpose: "ตรวจระดับคุณภาพแหล่งข้อมูล ป้ายหลักฐาน และทะเบียนแหล่งที่มา"
  },
  {
    path: "/data-qa",
    label: "Data QA",
    pageFile: "app/data-qa/page.tsx",
    purpose: "ตรวจ CSV คะแนน ความมั่นใจที่ถูกลด และคำเตือนข้อมูล"
  },
  {
    path: "/ux-qa",
    label: "UX QA",
    pageFile: "app/ux-qa/page.tsx",
    purpose: "เช็กลิสต์ UX/Implementation ความครบของ route และ gate ก่อนส่งงาน"
  },
  {
    path: "/trends",
    label: "เทรนด์",
    pageFile: "app/trends/page.tsx",
    purpose: "วิเคราะห์เทรนด์ คะแนน กราฟ และความมั่นใจของหลักฐาน"
  },
  {
    path: "/clips",
    label: "คลิป",
    pageFile: "app/clips/page.tsx",
    purpose: "ดูโอกาสจากคลิปสั้น ตัวกรอง แผนแพลตฟอร์ม และมุมคอนเทนต์"
  },
  {
    path: "/seo",
    label: "SEO",
    pageFile: "app/seo/page.tsx",
    purpose: "สร้าง caption, hook, hashtag, alt text, CTA, first comment และ keyword package"
  },
  {
    path: "/competitors",
    label: "คู่แข่ง",
    pageFile: "app/competitors/page.tsx",
    purpose: "ตารางคู่แข่งไทยเท่านั้นและช่องว่างเชิงกลยุทธ์"
  },
  {
    path: "/benchmarks",
    label: "Benchmark",
    pageFile: "app/benchmarks/page.tsx",
    purpose: "ดู creator benchmark ในเอเชีย โดยแยกจากคู่แข่งไทย"
  },
  {
    path: "/china",
    label: "จีน",
    pageFile: "app/china/page.tsx",
    purpose: "รูปแบบแพลตฟอร์มจีน ดัชนีที่ normalize แล้ว และข้อควรปรับใช้"
  },
  {
    path: "/events",
    label: "อีเวนต์",
    pageFile: "app/events/page.tsx",
    purpose: "วางแผนโอกาสจากอีเวนต์ พร้อมแหล่งข้อมูลและช่วงเวลาทำคอนเทนต์"
  },
  {
    path: "/style-system",
    label: "สไตล์",
    pageFile: "app/style-system/page.tsx",
    purpose: "แนวภาพ Bright CG cosplay และแนวทางรีทัช"
  },
  {
    path: "/tools",
    label: "เครื่องมือ",
    pageFile: "app/tools/page.tsx",
    purpose: "ทะเบียนเครื่องมือ/ปลั๊กอินพร้อม license, safety, checksum และคำเตือน"
  },
  {
    path: "/forecast",
    label: "คาดการณ์",
    pageFile: "app/forecast/page.tsx",
    purpose: "คาดการณ์พร้อมสมมติฐาน ความเสี่ยง โอกาส และวันที่อัปเดต"
  },
  {
    path: "/calendar",
    label: "ปฏิทิน",
    pageFile: "app/calendar/page.tsx",
    purpose: "ตารางถ่าย รีทัช ตัดต่อ และโพสต์รายสัปดาห์"
  },
  {
    path: "/import",
    label: "นำเข้า",
    pageFile: "app/import/page.tsx",
    purpose: "นำเข้า CSV ตรวจ error บันทึกใน browser และสถานะว่าง"
  },
  {
    path: "/experiments",
    label: "ทดลอง",
    pageFile: "app/experiments/page.tsx",
    purpose: "ติดตาม A/B experiment ของคอนเทนต์และสมมติฐาน"
  }
];

export const requiredDataLabels = [
  "mock",
  "estimated",
  "imported",
  "manual",
  "verified",
  "needs_update",
  "needs verification"
];

export const productUxFeatureChecks: UxFeatureCheck[] = [
  {
    id: "routes",
    label: "ทุกหน้า MVP มีอยู่จริงและเปิดหาเจอ",
    route: "global",
    evidence: "เมนู AppShell ใช้ route registry ชุดเดียวกับรายงาน QA นี้",
    status: "pass"
  },
  {
    id: "tables",
    label: "ตารางและหน้าสแกนครอบคลุมข้อมูล research",
    route: "/quality, /data-qa, /trends, /competitors, /benchmarks, /china, /tools",
    evidence: "ตารางซ้ำใช้แสดงแหล่งข้อมูล ป้ายกำกับ คะแนน ความเสี่ยง และ action",
    status: "pass"
  },
  {
    id: "filters",
    label: "ตัวกรองช่วยให้รีวิวข้อมูลซ้ำได้ง่าย",
    route: "/clips, /import",
    evidence: "ตัวกรองคลิปและ CSV validation ช่วยให้ข้อมูลเยอะยังอ่านง่าย",
    status: "pass"
  },
  {
    id: "charts",
    label: "กราฟโหลดแยก ไม่บล็อกหน้าแรก",
    route: "/, /trends",
    evidence: "Chart module ใช้ lazy load พร้อม fallback panel",
    status: "pass"
  },
  {
    id: "badges",
    label: "Badge แสดงความมั่นใจ แหล่งข้อมูล และป้ายข้อมูล",
    route: "global",
    evidence: "แสดงป้าย mock, estimated, imported, manual, verified, needs_update และ needs verification",
    status: "pass"
  },
  {
    id: "exports",
    label: "มี export สำหรับส่งต่องาน",
    route: "/, /competitors, /calendar, /tools",
    evidence: "ปุ่ม export สร้างไฟล์ brief, benchmark, calendar และ tool review",
    status: "pass"
  },
  {
    id: "empty-states",
    label: "สถานะว่างบอกขั้นตอนถัดไปชัดเจน",
    route: "/import",
    evidence: "หน้า CSV import มีรูปแบบตัวอย่าง ข้อความ validation สถานะบันทึก และ reset",
    status: "pass"
  },
  {
    id: "validation-errors",
    label: "Validation error อ่านแล้วแก้ต่อได้",
    route: "/import, /data-qa",
    evidence: "CSV และ scoring QA แสดง field ที่หาย enum ผิด URL ผิด และเหตุผลลด confidence",
    status: "pass"
  },
  {
    id: "responsive-ui",
    label: "Mobile และ desktop อ่านง่าย",
    route: "global",
    evidence: "AppShell ใช้ navigation และ grid ที่รองรับ breakpoint",
    status: "pass"
  },
  {
    id: "safe-boundaries",
    label: "ยังบล็อก scraping เสี่ยงและชื่อคู่แข่งจริง",
    route: "/quality, /competitors, /tools",
    evidence: "กฎแหล่งข้อมูล guardrail คู่แข่ง และ tool safety note แสดงใน UI",
    status: "pass"
  }
];

export function buildImplementationQaReport(input: ImplementationQaInput): ImplementationQaReport {
  const routeRows = input.routes.map((route) => ({
    ...route,
    exists: input.existingPageFiles.includes(route.pageFile),
    inNavigation: input.navigationPaths.includes(route.path)
  }));

  const missingRoutes = routeRows.filter((route) => !route.exists).map((route) => route.path);
  const missingNavigationRoutes = routeRows
    .filter((route) => !route.inNavigation)
    .map((route) => route.path);

  const passedChecks = input.featureChecks.filter((row) => row.status === "pass").length;
  const warningChecks = input.featureChecks.filter((row) => row.status === "warn").length;
  const failedChecks = input.featureChecks.filter((row) => row.status === "fail").length;
  const missingLabels = requiredDataLabels.filter((label) => !input.visibleLabels.includes(label));
  const failedVerification = input.verification.some((result) => result.status === "failed");
  const pendingVerification = input.verification.some((result) => result.status === "not_run");

  const hasBlockingIssue =
    missingRoutes.length > 0 ||
    missingNavigationRoutes.length > 0 ||
    failedChecks > 0 ||
    missingLabels.length > 0 ||
    failedVerification;

  const finalGate: QaStatus = hasBlockingIssue
    ? "fail"
    : warningChecks > 0 || pendingVerification
      ? "warn"
      : "pass";

  return {
    routeCoverage: {
      totalRequiredRoutes: input.routes.length,
      existingRoutes: routeRows.filter((route) => route.exists).length,
      missingRoutes,
      missingNavigationRoutes,
      routes: routeRows
    },
    featureCoverage: {
      totalChecks: input.featureChecks.length,
      passedChecks,
      warningChecks,
      failedChecks,
      rows: input.featureChecks
    },
    labelCoverage: {
      requiredLabels: requiredDataLabels,
      visibleLabels: input.visibleLabels,
      missingLabels
    },
    verification: input.verification,
    remainingLimitations: input.remainingLimitations,
    finalGate
  };
}
