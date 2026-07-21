/**
 * Type definitions for the IDO .iwf dial format.
 *
 * These mirror the in-memory structures used by the original PyQt6
 * application (DialEditorForIDW20.py) as closely as possible:
 *   - "item" JSON objects (widget/type + arbitrary extra keys)
 *   - the widget_list entries (json + associated image assets)
 *   - font.json items
 */

/** A single "item" entry as it appears in iwf.json's `item` array. */
export interface WidgetJson {
  widget: string;
  type: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  // Every other field is dynamic (fgcolor, font, fontnum, hour, etc.)
  [key: string]: string | number | boolean | undefined;
}

/** One entry in font.json's `item` array. */
export interface FontJsonItem {
  name: string;
  bpp: number;
  format: string;
}

/**
 * In-memory representation of a placed widget (mirrors the Python
 * `entry` dict stored in `self.widget_list`).
 *
 * Unlike the desktop app, there is no filesystem: any image bytes the
 * widget depends on (hand images, font-strip glyphs) live in the
 * project's virtual file table (see ProjectFiles) and are also kept
 * here, pre-decoded, for fast rendering.
 */
export interface WidgetEntry {
  widgetType: string; // "watch" | "custom" | "ring" | "progressbar"
  typeValue: string; // "time" | "date" | "hour" | ... | "" for coming-soon
  json: WidgetJson;
  /** Decoded glyph/image strip keyed by base filename (no extension). */
  imageStrip: Record<string, HTMLImageElement>;
  /** Folder name inside the project this widget's images live under. */
  fontFolder: string;
}

/** The root iwf.json object. */
export interface RootJson {
  version: number;
  clouddialversion: number;
  preview: string;
  name: string;
  author: string;
  description: string;
  deviceId: string;
  bluetooth: boolean;
  disturb: boolean;
  battery: boolean;
  compress: string;
  item: WidgetJson[];
  bkground: string;
}

/** Preview clock time used to drive digit/hand rendering. */
export interface PreviewTime {
  hour: number; // 0-23
  minute: number;
  second: number;
}

export const SUPPORTED_CUSTOM = new Set([
  "date", "time", "hour", "hourhi", "hourlo", "min", "minhi", "minlo",
  "second", "week", "day", "month", "year",
  "calorie", "distance", "heartrate", "battery",
  "step", "walk", "exercise", "apm", "weather",
]);

export const COMING_SOON = new Set([
  "redpoint", "anima", "multimeter", "gradient",
  "shortcut", "sleep", "bluetooth", "icon",
]);

/** All "custom" sub-types offered in the Add Widget dialog. */
export const CUSTOM_TYPES = [
  "date", "time", "hour", "hourhi", "hourlo", "min", "minhi", "minlo",
  "second", "week", "day", "month", "year",
  "calorie", "distance", "heartrate", "redpoint", "battery",
  "step", "walk", "exercise", "icon", "sleep", "bluetooth", "apm",
  "shortcut", "anima", "multimeter", "gradient", "weather",
];

export const RING_PROGRESS_TYPES = [
  "battery", "calorie", "distance", "heartrate", "walk", "exercise", "step",
];

/**
 * Scroll-area editable fields, mirrors MainWindow.SCROLL_FIELDS.
 * The (checkbox, lineEdit) widget-name pairs from PyQt are irrelevant
 * in the web port; only the JSON key matters here.
 */
export const SCROLL_FIELDS: string[] = [
  "fgcolor", "bgcolor", "fgrender", "bgrender", "bg", "align", "style",
  "follow", "target", "font", "fontnum", "numwidth", "time", "turn",
  "animatype", "animaicon", "frame", "animabpp", "animaformat", "app",
  "panchorx", "panchory", "pcenterx", "pcentery", "startangle", "endangle",
  "content", "direction", "pointer", "ringedge", "second", "seccenterx",
  "seccentery", "secanchorx", "secanchory", "minute", "mincenterx",
  "mincentery", "minanchorx", "minanchory", "hour", "hourcenterx",
  "hourcentery", "houranchorx", "houranchory",
];

/** Mirrors MainWindow.INT_KEYS. */
export const INT_KEYS = new Set([
  "fontnum", "numwidth", "style", "turn", "frame", "animabpp", "animatype",
  "panchorx", "panchory", "pcenterx", "pcentery",
  "startangle", "endangle", "pointer", "ringedge", "direction",
  "seccenterx", "seccentery", "secanchorx", "secanchory",
  "mincenterx", "mincentery", "minanchorx", "minanchory",
  "hourcenterx", "hourcentery", "houranchorx", "houranchory",
]);

/** Mirrors MainWindow.PREVIEW_VALUES (static defaults before any time edit). */
export const DEFAULT_PREVIEW_VALUES: Record<string, string> = {
  time: "10:08",
  hour: "10",
  hourhi: "1",
  hourlo: "0",
  min: "08",
  minhi: "0",
  minlo: "8",
  second: "36",
  date: "24/09",
  day: "24",
  year: "2025",
  step: "23980",
  calorie: "839",
  heartrate: "128",
  distance: "16.79",
  exercise: "20",
  walk: "10",
  battery: "100%",
  weather: "28",
  week: "en_wed",
  month: "en_sept",
  apm: "en_am",
  icon: "",
  anima: "",
};

// ---------------------------------------------------------------------
// Device profiles
// ---------------------------------------------------------------------

export type DeviceId = "IDW13" | "IDW18" | "IDB03" | "IDW20";

export interface DeviceProfile {
  id: DeviceId;
  label: string;
  /** Internal watch-face canvas size (not scaled — matches the device's real pixel size). */
  canvasW: number;
  canvasH: number;
  /** Default clock-hand anchor point (the pivot's target position, dial center). */
  anchorX: number;
  anchorY: number;
  /** Saved preview.png output size. */
  previewW: number;
  previewH: number;
  /** Corner radius used when drawing the rounded preview border. */
  previewCornerRadius: number;
  /** Canvas strokeStyle for the preview's rounded border. */
  previewBorderColor: string;
  /** Stroke width (px) for the preview's rounded border. */
  previewBorderWidth: number;
}

export interface DeviceProfile {
  id: DeviceId;
  label: string;
  canvasW: number;
  canvasH: number;
  anchorX: number;
  anchorY: number;
  previewW: number;
  previewH: number;
  previewCornerRadius: number;
  previewBorderColor: string;
  previewBorderWidth: number;        // Stroke thickness (keep as is)
  previewBorderRectWidth?: number;   // Width of the border rectangle (NEW)
  previewBorderRectHeight?: number;  // Height of the border rectangle (NEW)
  previewScale: number;
}

export const DEVICE_PROFILES: Record<DeviceId, DeviceProfile> = {
  IDW13: {
    id: "IDW13",
    label: "IDW13 (240x284)",
    canvasW: 240,
    canvasH: 284,
    anchorX: 120,
    anchorY: 142,
    previewW: 174,
    previewH: 196,
    previewCornerRadius: 31,
    previewBorderColor: "rgba(37, 37, 37)",
    previewBorderWidth: 2,
    previewBorderRectWidth: 168,   // Custom border width (NEW)
    previewBorderRectHeight: 194,  // Custom border height (NEW)
    previewScale: 1,
  },
  IDW18: {
    id: "IDW18",
    label: "IDW18 (240x240)",
    canvasW: 240,
    canvasH: 240,
    anchorX: 120,
    anchorY: 120,
    previewW: 180,
    previewH: 180,
    previewCornerRadius: 84,
    previewBorderColor: "rgba(123, 123, 123)",
    previewBorderWidth: 2,
    previewBorderRectWidth: 169,   // Custom border width (NEW)
    previewBorderRectHeight: 169,  // Custom border height (NEW)
    previewScale: 0.94,
  },
  IDB03: {
    id: "IDB03",
    label: "IDB03 (200x320)",
    canvasW: 200,
    canvasH: 320,
    anchorX: 100,
    anchorY: 160,
    previewW: 154,
    previewH: 240,
    previewCornerRadius: 8,
    previewBorderColor: "rgba(123, 123, 123)",
    previewBorderWidth: 2,
    previewBorderRectWidth: 142,   // Custom border width (NEW)
    previewBorderRectHeight: 226,  // Custom border height (NEW)
    previewScale: 0.95,
  },
  IDW20: {
    id: "IDW20",
    label: "IDW20 (320x385)",
    canvasW: 320,
    canvasH: 385,
    anchorX: 160,
    anchorY: 193,
    previewW: 272,
    previewH: 324,
    previewCornerRadius: 67,
    previewBorderColor: "rgb(128, 128, 128)",
    previewBorderWidth: 3,
    previewBorderRectWidth: 268,   // Custom border width (NEW)
    previewBorderRectHeight: 320,  // Custom border height (NEW)
    previewScale: 0.95,
  },
};

export const DEVICE_IDS: DeviceId[] = ["IDW13", "IDW18", "IDW20", "IDB03"];
export const DEFAULT_DEVICE: DeviceId = "IDW20";

/** Resolves a (possibly unrecognized/legacy) deviceId string to a known profile, defaulting to IDW20. */
export function getDeviceProfile(deviceId: string | undefined): DeviceProfile {
  if (deviceId === "IDW13" || deviceId === "IDW18" || deviceId === "IDB03" || deviceId === "IDW20") return DEVICE_PROFILES[deviceId];
  return DEVICE_PROFILES[DEFAULT_DEVICE];
}
