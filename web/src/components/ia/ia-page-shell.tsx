import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHub } from "@/components/ia/section-hub";
import { ServiceLeaf } from "@/components/ia/service-leaf";

export function IaPageShell({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader active={active} />
      <main className="min-h-[60vh] bg-[#F7F9FC]">{children}</main>
    </>
  );
}

export { SectionHub, ServiceLeaf, Link };
