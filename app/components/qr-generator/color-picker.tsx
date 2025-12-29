import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface ColorPickerProps {
  fgColor: string;
  bgColor: string;
  bgTransparent: boolean;
  onFgColorChange: (color: string) => void;
  onBgColorChange: (color: string) => void;
  onBgTransparentChange: (transparent: boolean) => void;
}

export function ColorPicker({
  fgColor,
  bgColor,
  bgTransparent,
  onFgColorChange,
  onBgColorChange,
  onBgTransparentChange,
}: ColorPickerProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fg-color">Foreground Color</Label>
        <div className="flex items-center gap-2">
          <Input
            id="fg-color"
            type="color"
            value={fgColor}
            onChange={(e) => onFgColorChange(e.target.value)}
            className="h-10 w-20 cursor-pointer"
          />
          <Input
            type="text"
            value={fgColor}
            onChange={(e) => onFgColorChange(e.target.value)}
            className="font-mono"
            placeholder="#000000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bg-color">Background Color</Label>
        <div className="flex items-center gap-2">
          <Input
            id="bg-color"
            type="color"
            value={bgColor}
            onChange={(e) => onBgColorChange(e.target.value)}
            disabled={bgTransparent}
            className="h-10 w-20 cursor-pointer disabled:opacity-50"
          />
          <Input
            type="text"
            value={bgColor}
            onChange={(e) => onBgColorChange(e.target.value)}
            disabled={bgTransparent}
            className="font-mono disabled:opacity-50"
            placeholder="#FFFFFF"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="bg-transparent"
          type="checkbox"
          className="h-4 w-4 rounded border-input"
          checked={bgTransparent}
          onChange={(e) => onBgTransparentChange(e.target.checked)}
        />
        <Label htmlFor="bg-transparent" className="cursor-pointer">
          Transparent background
        </Label>
      </div>
    </div>
  );
}
