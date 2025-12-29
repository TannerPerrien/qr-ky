import { Alert, AlertDescription } from '~/components/ui/alert';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { validateURL } from '~/lib/validation';

interface URLFormProps {
  value: string;
  onChange: (value: string) => void;
}

export function URLForm({ value, onChange }: URLFormProps) {
  const isValid = !value || validateURL(value);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url-input">URL</Label>
        <Input
          id="url-input"
          type="text"
          placeholder="https://example.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {!isValid && value && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            URL is not well-formed. QR code will encode the raw text.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
