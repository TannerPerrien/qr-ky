import { QRCodeSVG } from 'qrcode.react';

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
    <div className="flex items-center justify-center rounded-lg border bg-card p-8">
      <QRCodeSVG
        value={displayValue}
        size={300}
        fgColor={fgColor}
        bgColor={bgTransparent ? 'transparent' : bgColor}
        level="M"
        includeMargin={true}
      />
    </div>
  );
}
