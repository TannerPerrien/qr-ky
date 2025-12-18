import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "QR-KY - QR Code Generator" },
    {
      name: "description",
      content: "Generate QR codes for URLs, WiFi credentials, and custom data. Client-side processing with download as PNG or SVG."
    },
  ];
}

export default function Home() {
  return (
    <main className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2">QR-KY</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Generate custom QR codes instantly
      </p>
    </main>
  );
}
