import { useState } from 'react';
import type { Route } from "./+types/home";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';
import { URLForm } from '~/components/qr-generator/url-form';
import { WiFiForm } from '~/components/qr-generator/wifi-form';
import { RawForm } from '~/components/qr-generator/raw-form';
import { ColorPicker } from '~/components/qr-generator/color-picker';
import { QRPreview } from '~/components/qr-generator/qr-preview';
import { QRDownload } from '~/components/qr-generator/qr-download';
import { formatWiFiURI } from '~/lib/wifi-utils';

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
  // QR Type Selection
  const [qrType, setQrType] = useState<'url' | 'wifi' | 'raw'>('url');

  // URL state
  const [urlValue, setUrlValue] = useState<string>('');

  // WiFi state
  const [wifiSSID, setWifiSSID] = useState<string>('');
  const [wifiPassword, setWifiPassword] = useState<string>('');
  const [wifiType, setWifiType] = useState<'WPA' | 'open'>('WPA');
  const [wifiHidden, setWifiHidden] = useState<boolean>(false);

  // Raw text state
  const [rawValue, setRawValue] = useState<string>('');

  // Color state
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [bgTransparent, setBgTransparent] = useState<boolean>(false);

  // Compute WiFi URI for display
  const wifiURI = formatWiFiURI({
    ssid: wifiSSID,
    password: wifiPassword,
    type: wifiType,
    hidden: wifiHidden,
  });

  // Auto-generate QR value in real-time
  const qrValue = (() => {
    switch (qrType) {
      case 'url':
        return urlValue;
      case 'wifi':
        return wifiURI;
      case 'raw':
        return rawValue;
      default:
        return '';
    }
  })();

  // Handle QR type change
  const handleQRTypeChange = (newType: 'url' | 'wifi' | 'raw') => {
    setQrType(newType);
  };

  return (
    <main className="container mx-auto p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">QR-KY</h1>
        <p className="text-muted-foreground">
          Generate custom QR codes instantly
        </p>
      </div>

      {/* Tabs and Main Content */}
      <Tabs value={qrType} onValueChange={(v) => handleQRTypeChange(v as 'url' | 'wifi' | 'raw')}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="wifi">WiFi</TabsTrigger>
          <TabsTrigger value="raw">Raw</TabsTrigger>
        </TabsList>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* Input Form Card */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  {qrType === 'url' && 'Enter a URL to encode'}
                  {qrType === 'wifi' && 'Enter WiFi network details'}
                  {qrType === 'raw' && 'Enter custom text to encode'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="url" className="mt-0">
                  <URLForm value={urlValue} onChange={setUrlValue} />
                </TabsContent>
                <TabsContent value="wifi" className="mt-0">
                  <WiFiForm
                    ssid={wifiSSID}
                    password={wifiPassword}
                    securityType={wifiType}
                    hidden={wifiHidden}
                    wifiURI={wifiURI}
                    onSSIDChange={setWifiSSID}
                    onPasswordChange={setWifiPassword}
                    onSecurityTypeChange={setWifiType}
                    onHiddenChange={setWifiHidden}
                  />
                </TabsContent>
                <TabsContent value="raw" className="mt-0">
                  <RawForm value={rawValue} onChange={setRawValue} />
                </TabsContent>
              </CardContent>
            </Card>

          {/* Color Picker Card */}
          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
              <CardDescription>Customize the QR code appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorPicker
                fgColor={fgColor}
                bgColor={bgColor}
                bgTransparent={bgTransparent}
                onFgColorChange={setFgColor}
                onBgColorChange={setBgColor}
                onBgTransparentChange={setBgTransparent}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview & Download */}
        <div className="space-y-6">
          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>QR code preview and generation</CardDescription>
            </CardHeader>
            <CardContent>
              <QRPreview
                value={qrValue}
                fgColor={fgColor}
                bgColor={bgColor}
                bgTransparent={bgTransparent}
              />
            </CardContent>
          </Card>

          {/* Download Card */}
          <Card>
            <CardHeader>
              <CardTitle>Download</CardTitle>
              <CardDescription>Export as PNG or SVG (1000x1000px)</CardDescription>
            </CardHeader>
            <CardContent>
              <QRDownload
                value={qrValue}
                fgColor={fgColor}
                bgColor={bgColor}
                bgTransparent={bgTransparent}
                disabled={!qrValue}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      </Tabs>
    </main>
  );
}
