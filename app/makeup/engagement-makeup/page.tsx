import { ServicePage } from "@/components/services/ServicePage";
import { getService } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const service = getService("engagement-makeup")!;

export const metadata = buildMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: "/makeup/engagement-makeup",
});

export default function Page() {
  return <ServicePage service={service} />;
}
