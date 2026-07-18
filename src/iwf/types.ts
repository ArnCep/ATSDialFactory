/**
 * Type definitions for the IDW20 IWF dial format.
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
  "step", "walk", "exercise", "apm", "weather", "icon",
]);

export const COMING_SOON = new Set([
  "redpoint", "anima", "multimeter", "gradient",
  "shortcut", "sleep", "bluetooth",
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

export const CANVAS_W = 320;
export const CANVAS_H = 385;
