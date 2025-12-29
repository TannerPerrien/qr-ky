/**
 * Downloads a QR code as PNG
 * TODO: Implement with qrcode library
 */
export const downloadQRAsPNG = (
  value: string,
  fgColor: string,
  bgColor: string,
  filename: string = 'qrcode.png'
): void => {
  console.log('PNG download not yet implemented', { value, fgColor, bgColor, filename });
  alert('PNG download functionality will be implemented soon!');
};

/**
 * Downloads a QR code as SVG
 * TODO: Implement with qrcode library
 */
export const downloadQRAsSVG = (
  value: string,
  fgColor: string,
  bgColor: string,
  filename: string = 'qrcode.svg'
): void => {
  console.log('SVG download not yet implemented', { value, fgColor, bgColor, filename });
  alert('SVG download functionality will be implemented soon!');
};

/**
 * Helper to trigger a download in the browser
 */
export const triggerDownload = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
