import { ServicePage } from "@/components/services/ServicePage";
import { getService } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const service = getService("hd-makeup")!;

export const metadata = buildMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: "/makeup/hd-makeup",
});

export default function Page() {
  return <ServicePage service={service} />;
}
