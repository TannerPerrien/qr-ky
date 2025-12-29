import { Textarea } from '~/components/ui/textarea';
import { Label } from '~/components/ui/label';

interface RawFormProps {
  value: string;
  onChange: (value: string) => void;
}

export function RawForm({ value, onChange }: RawFormProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="raw-input">Text Content</Label>
      <Textarea
        id="raw-input"
        placeholder="Enter any text to encode in the QR code..."
        className="min-h-[120px] resize-y"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-sm text-muted-foreground">
        Character count: {value.length}
      </p>
    </div>
  );
}
