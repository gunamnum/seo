import { ExportButton } from "@/components/export-button";
import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { toolsPlugins } from "@/lib/seed";
import { labelPriceType, labelRecommendation, labelToolCategory } from "@/lib/thaiLabels";

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        title="แนะนำเครื่องมือและปลั๊กอิน"
        description="รายการเครื่องมือฟรี/ต้นทุนต่ำ พร้อมแหล่งทางการและรายการตรวจความปลอดภัย ไม่ hardcode เวอร์ชันล่าสุดถ้ายังไม่ตรวจสอบ"
      >
        <ExportButton rows={toolsPlugins as unknown as Array<Record<string, unknown>>} filename="tools-safety-list.csv" />
      </PageHeader>
      <Panel title="ตารางตรวจความปลอดภัย">
        <SimpleTable
          columns={["เครื่องมือ", "หมวด", "ราคา", "ใช้ทำอะไร", "ความปลอดภัย", "ระดับแนะนำ"]}
          rows={toolsPlugins.map((tool) => ({
            เครื่องมือ: tool.tool_name,
            หมวด: labelToolCategory(tool.category),
            ราคา: <Badge tone="blue">{labelPriceType(tool.price_type)}</Badge>,
            "ใช้ทำอะไร": tool.main_use_case,
            ความปลอดภัย: tool.safety_checklist,
            ระดับแนะนำ: <Badge tone={tool.recommendation_level === "recommended" ? "green" : "amber"}>{labelRecommendation(tool.recommendation_level)}</Badge>
          }))}
        />
      </Panel>
    </>
  );
}
