import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquiries admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="bg-ivory">{children}</div>;
}
