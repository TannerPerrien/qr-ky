import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '~/components/ui/button';
import { Download } from 'lucide-react';

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
  const svgRef = useRef<HTMLDivElement>(null);

  const handlePNGDownload = () => {
    if (!value || !svgRef.current) return;

    // Get the SVG element from the hidden container
    const svgElement = svgRef.current.querySelector('svg');
    if (!svgElement) return;

    // Serialize SVG to string
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Create image and canvas
    const img = new Image();
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;

    img.onload = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // If background is transparent, don't fill
      // Otherwise fill with background color
      if (!bgTransparent) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 1000, 1000);
      }

      ctx.drawImage(img, 0, 0);

      // Create download link
      const a = document.createElement('a');
      a.download = 'qrcode.png';
      a.href = canvas.toDataURL('image/png');
      a.click();

      // Cleanup
      URL.revokeObjectURL(svgUrl);
    };

    img.src = svgUrl;
  };

  const handleSVGDownload = () => {
    if (!value || !svgRef.current) return;

    // Get the SVG element from the hidden container
    const svgElement = svgRef.current.querySelector('svg');
    if (!svgElement) return;

    // Serialize SVG to string
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Create download link
    const a = document.createElement('a');
    a.download = 'qrcode.svg';
    a.href = svgUrl;
    a.click();

    // Cleanup
    URL.revokeObjectURL(svgUrl);
  };

  const finalBgColor = bgTransparent ? 'transparent' : bgColor;

  return (
    <>
      {/* Hidden QR code at full resolution for downloads */}
      <div ref={svgRef} className="hidden">
        <QRCodeSVG
          value={value || 'placeholder'}
          size={1000}
          fgColor={fgColor}
          bgColor={finalBgColor}
          level="M"
          includeMargin={true}
        />
      </div>

      {/* Download buttons */}
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
    </>
  );
}
