import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode for GitHub Pages
  ssr: false,
  // Tell the router it's running at /qr-ky/ (only in production)
  basename: process.env.NODE_ENV === "production" ? "/qr-ky" : undefined,
  // Note: Prerendering disabled because it creates nested directories with basename
} satisfies Config;
