import { Button } from '~/components/ui/button';
import { Download } from 'lucide-react';
import { downloadQRAsPNG, downloadQRAsSVG } from '~/lib/qr-utils';

interface QRDownloadProps {
  value: string;
  fgColor: string;
  bgColor: string;
  bgTransparent: boolean;
  disabled: boolean;
}

export function QRDownload({
  value,
  fgColor,
  bgColor,
  bgTransparent,
  disabled,
}: QRDownloadProps) {
  const handlePNGDownload = () => {
    if (!value) return;
    const finalBgColor = bgTransparent ? 'transparent' : bgColor;
    downloadQRAsPNG(value, fgColor, finalBgColor);
  };

  const handleSVGDownload = () => {
    if (!value) return;
    const finalBgColor = bgTransparent ? 'transparent' : bgColor;
    downloadQRAsSVG(value, fgColor, finalBgColor);
  };

  return (
    <div className="flex gap-3">
      <Button
        onClick={handlePNGDownload}
        disabled={disabled || !value}
        variant="outline"
        className="flex-1"
      >
        <Download className="mr-2 h-4 w-4" />
        Download PNG
      </Button>
      <Button
        onClick={handleSVGDownload}
        disabled={disabled || !value}
        variant="outline"
        className="flex-1"
      >
        <Download className="mr-2 h-4 w-4" />
        Download SVG
      </Button>
    </div>
  );
}
