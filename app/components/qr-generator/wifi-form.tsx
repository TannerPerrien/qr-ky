import { useState } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface WiFiFormProps {
  ssid: string;
  password: string;
  securityType: 'WPA' | 'open';
  hidden: boolean;
  wifiURI: string;
  onSSIDChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSecurityTypeChange: (value: 'WPA' | 'open') => void;
  onHiddenChange: (value: boolean) => void;
}

export function WiFiForm({
  ssid,
  password,
  securityType,
  hidden,
  wifiURI,
  onSSIDChange,
  onPasswordChange,
  onSecurityTypeChange,
  onHiddenChange,
}: WiFiFormProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wifiURI);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
        <Input
          id="wifi-ssid"
          type="text"
          placeholder="My WiFi Network"
          value={ssid}
          onChange={(e) => onSSIDChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="wifi-security">Security Type</Label>
        <select
          id="wifi-security"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          value={securityType}
          onChange={(e) => onSecurityTypeChange(e.target.value as 'WPA' | 'open')}
        >
          <option value="WPA">WPA/WPA2/WPA3</option>
          <option value="open">Open (No Password)</option>
        </select>
      </div>

      {securityType === 'WPA' && (
        <div className="space-y-2">
          <Label htmlFor="wifi-password">Password</Label>
          <Input
            id="wifi-password"
            type="password"
            placeholder="Enter WiFi password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="wifi-hidden"
          checked={hidden}
          onCheckedChange={onHiddenChange}
        />
        <Label htmlFor="wifi-hidden" className="cursor-pointer">
          Hidden network
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="wifi-encoded">Encoded URI</Label>
        <div className="flex gap-2">
          <Input
            id="wifi-encoded"
            type="text"
            value={wifiURI}
            readOnly
            className="font-mono text-sm text-muted-foreground"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!wifiURI}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
