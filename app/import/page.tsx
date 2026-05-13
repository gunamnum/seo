import { ImportCenter } from "@/components/import-center";
import { PageHeader } from "@/components/ui";

export default function ImportPage() {
  return (
    <>
      <PageHeader
        title="ศูนย์นำเข้า CSV"
        description="ตรวจไฟล์ CSV สำหรับเทรนด์ คลิป คู่แข่ง ผู้สร้างอ้างอิง อีเวนต์ เครื่องมือ SEO ตัวชี้วัด และการทดลอง"
      />
      <ImportCenter />
    </>
  );
}
