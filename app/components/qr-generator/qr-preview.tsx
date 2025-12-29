import { QRCodeSVG } from 'qrcode.react';
import { cn } from '~/lib/utils';

interface QRPreviewProps {
  value: string;
  fgColor: string;
  bgColor: string;
  bgTransparent: boolean;
}

export function QRPreview({
  value,
  fgColor,
  bgColor,
  bgTransparent,
}: QRPreviewProps) {
  // Use a placeholder if no value is provided
  const displayValue = value || 'https://example.com';

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border p-8",
        bgTransparent ? "checkered-bg" : "bg-card"
      )}
    >
      <QRCodeSVG
        value={displayValue}
        size={300}
        fgColor={fgColor}
        bgColor={bgTransparent ? 'transparent' : bgColor}
        level="M"
      />
    </div>
  );
}
