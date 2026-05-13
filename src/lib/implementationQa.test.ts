import { describe, expect, it } from "vitest";
import {
  buildImplementationQaReport,
  productUxFeatureChecks,
  projectRoutes,
  requiredDataLabels
} from "./implementationQa";

describe("implementation QA report", () => {
  it("passes when routes, navigation, feature checks, labels, and verification are covered", () => {
    const report = buildImplementationQaReport({
      routes: projectRoutes,
      existingPageFiles: projectRoutes.map((route) => route.pageFile),
      navigationPaths: projectRoutes.map((route) => route.path),
      featureChecks: productUxFeatureChecks,
      visibleLabels: requiredDataLabels,
      verification: [
        { command: "npm test", status: "passed", evidence: "unit suite passed" },
        { command: "npm run typecheck", status: "passed", evidence: "tsc passed" },
        { command: "npm run build", status: "passed", evidence: "static build passed" }
      ],
      remainingLimitations: ["MVP uses mock/offline data by default."]
    });

    expect(report.routeCoverage.missingRoutes).toEqual([]);
    expect(report.routeCoverage.missingNavigationRoutes).toEqual([]);
    expect(report.featureCoverage.failedChecks).toBe(0);
    expect(report.labelCoverage.missingLabels).toEqual([]);
    expect(report.finalGate).toBe("pass");
  });

  it("fails when a required route, navigation item, label, feature, or verification gate is missing", () => {
    const [firstRoute, ...otherRoutes] = projectRoutes;
    const report = buildImplementationQaReport({
      routes: projectRoutes,
      existingPageFiles: otherRoutes.map((route) => route.pageFile),
      navigationPaths: otherRoutes.map((route) => route.path),
      featureChecks: [
        ...productUxFeatureChecks,
        {
          id: "validation-errors",
          label: "Validation errors are visible",
          route: "/import",
          evidence: "Validation summary hidden",
          status: "fail"
        }
      ],
      visibleLabels: requiredDataLabels.filter((label) => label !== "needs verification"),
      verification: [{ command: "npm run build", status: "failed", evidence: "build failed" }],
      remainingLimitations: []
    });

    expect(report.routeCoverage.missingRoutes).toEqual([firstRoute.path]);
    expect(report.routeCoverage.missingNavigationRoutes).toEqual([firstRoute.path]);
    expect(report.featureCoverage.failedChecks).toBe(1);
    expect(report.labelCoverage.missingLabels).toEqual(["needs verification"]);
    expect(report.finalGate).toBe("fail");
  });

  it("warns when implementation checks pass but final verification has not been run", () => {
    const report = buildImplementationQaReport({
      routes: projectRoutes,
      existingPageFiles: projectRoutes.map((route) => route.pageFile),
      navigationPaths: projectRoutes.map((route) => route.path),
      featureChecks: productUxFeatureChecks,
      visibleLabels: requiredDataLabels,
      verification: [{ command: "npm run build", status: "not_run", evidence: "pending handoff" }],
      remainingLimitations: []
    });

    expect(report.finalGate).toBe("warn");
  });
});
