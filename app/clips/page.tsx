import { PageHeader } from "@/components/ui";
import { ViralClipExplorer } from "@/components/viral-clip-explorer";
import { viralClips } from "@/lib/seed";

export default function ClipsPage() {
  return (
    <>
      <PageHeader
        title="วิเคราะห์คลิปไวรัล"
        description="กรองคลิปที่สังเกตเองตามแพลตฟอร์ม ประเภทคอนเทนต์ สไตล์ภาพ และเรียงตามยอดดู การมีส่วนร่วม การแชร์ หรือยอดบันทึก"
      />
      <ViralClipExplorer clips={viralClips} />
    </>
  );
}
