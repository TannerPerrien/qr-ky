/**
 * WiFi configuration for QR code generation
 */
export interface WiFiConfig {
  ssid: string;
  password?: string;
  type: 'WPA' | 'open';
  hidden: boolean;
}

/**
 * Encodes special characters in WiFi values according to WiFi QR spec
 */
const encodeWiFiValue = (value: string): string => {
  return value
    .replace(/\\/g, '\\\\')  // Backslash must be escaped first
    .replace(/;/g, '\\;')     // Semicolon
    .replace(/:/g, '\\:')     // Colon
    .replace(/,/g, '\\,')     // Comma
    .replace(/"/g, '\\"');    // Quote
};

/**
 * Formats a WiFi configuration into a WiFi QR code URI
 * Based on WPA3 specification - basic implementation
 *
 * Format: WIFI:T:<type>;S:<ssid>;P:<password>;H:<hidden>;;
 */
export const formatWiFiURI = (config: WiFiConfig): string => {
  let uri = 'WIFI:';

  // Add security type (optional, defaults to "open" if omitted)
  if (config.type === 'WPA') {
    uri += 'T:WPA;';
  }

  // Add SSID (required)
  uri += `S:${encodeWiFiValue(config.ssid)};`;

  // Add password (required for WPA)
  if (config.password) {
    uri += `P:${encodeWiFiValue(config.password)};`;
  }

  // Add hidden network flag (optional)
  if (config.hidden) {
    uri += 'H:true;';
  }

  // End with double semicolon
  uri += ';';

  return uri;
};
