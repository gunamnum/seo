import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "แดชบอร์ดเติบโตคอสเพลย์",
  description: "แดชบอร์ด MVP แบบ offline สำหรับวางแผนเติบโตของช่างภาพคอสเพลย์ไทย"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
