import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  // Pre-render the home route at build time
  // NOTE: Temporarily disabled due to hydration error with GitHub Pages base path
  // The prerendered HTML has basename:"/" but client expects basename:"/qr-ky"
  // async prerender() {
  //   return ["/"];
  // },
} satisfies Config;
