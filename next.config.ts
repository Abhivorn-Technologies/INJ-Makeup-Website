import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    qualities: [75],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Legacy WordPress URLs on injmakeup.com → new routes (protects existing SEO).
  async redirects() {
    return [
      { source: "/hair", destination: "/hair-styling", permanent: true },
      { source: "/hair/", destination: "/hair-styling", permanent: true },
      { source: "/makeup-school", destination: "/academy", permanent: true },
      { source: "/makeup-school/", destination: "/academy", permanent: true },
    ];
  },
};

export default nextConfig;
