# Dial Editor for IDW20 — Web Port

A faithful React + TypeScript + HTML5 Canvas port of the PyQt6 desktop
app `DialEditorForIDW20.py`. This is not a redesign — every rendering
rule, JSON key-ordering quirk, and widget behavior from the Python
source was ported deliberately, per `CLAUDE.md`.

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static
production bundle (`dist/`) that can be hosted anywhere.

## Architecture

```
src/
  iwf/
    types.ts        Data model: WidgetJson, WidgetEntry, RootJson, the
                     SCROLL_FIELDS/INT_KEYS/PREVIEW_VALUES tables, etc.
                     Ported from MainWindow's class-level constants.
    IWFParser.ts     buildRootJson() / prettyJson() — byte-for-byte port
                     of build_root_json()/pretty_json(), including the
                     custom per-widget-type key ordering.
    IWFExporter.ts   ZIP assembly, ported from on_create_zip_file().

  core/
    ProjectFiles.ts       In-memory replacement for project_dir: a
                           path -> Blob table (no filesystem in a browser).
    Scene.ts               ProjectState shape + pure helpers
                           (derivePreviewValues, findLastWatchEntry, ...),
                           ported from MainWindow's instance state and
                           on_preview_time_changed()'s PREVIEW_VALUES math.
    CustomWidgetRenderer.ts Image-font glyph compositing, ported from
                           render_custom_widget_image(). Digits/letters
                           are still rendered from image strips, never
                           system fonts.
    HandRenderer.ts        Clock hand rotation-about-pivot math, ported
                           from render_watch_hands(). Uses canvas
                           translate/rotate directly instead of the
                           padded-canvas trick QImage needed.
    Renderer.ts             Whole-scene compositor: background, widgets,
                           hands, selection highlight — mirrors the
                           layering of the original QGraphicsScene.
    PreviewRenderer.ts      272x324 rounded-border preview.png generator,
                           ported from on_save_preview().
    actions.ts              All the "slot" methods: newProject,
                           addWatchWidget, addCustomWidget, applyWidgetChanges,
                           uploadBackground, save/export, etc.

  components/
    Toolbar.tsx, WidgetPanel.tsx, PropertiesPanel.tsx, WatchCanvas.tsx
    dialogs/  NewProjectDialog, ClockHandsDialog, AddCustomWidgetDialog,
              BackgroundHelperDialog (port of bkground_helper.py)
```

State lives in one mutable `ProjectState` object (see
`core/useProjectStore.ts`) rather than fully-immutable React state,
because the widget list holds live `HTMLImageElement`/`HTMLCanvasElement`
references that get mutated during render passes — the same pattern
the original used with a mutable `self.widget_list` of dicts. A `tick`
counter triggers re-renders after each mutation, which is the React
analogue of PyQt's signal/slot updates.

## Multi-device support (IDW13 + IDW20)

The editor supports two devices via a device combobox (in "New Project"
and in the toolbar for an already-open project), backed by
`iwf/types.ts`'s `DEVICE_PROFILES` table:

| Device | Canvas    | Hand anchor | Preview size | Preview border                              |
|--------|-----------|-------------|---------------|----------------------------------------------|
| IDW13  | 240 × 284 | (120, 142)  | 174 × 196     | radius ~31px, `rgb(128,128,128)` @ 40% opacity, width 2 |
| IDW20  | 320 × 385 | (160, 193)  | 272 × 324     | radius 67px (already defined), solid `rgb(128,128,128)`, width 3 |

The device is stored in the existing `deviceId` field of `iwf.json` —
no new JSON keys were introduced, per the "do not change JSON
structure" rule in `CLAUDE.md`. It drives:

- the canvas/watch-face render size (`core/Renderer.ts`, `WatchCanvas.tsx`)
- the default hand anchor pre-filled in the "Configure watch hands"
  dialog when adding a `watch` widget
- default `w`/`h` for newly added `watch`/generic widgets
- the max size allowed for background uploads
- the `preview.png` output size and rounded-border corner radius

IDW13's corner radius (~31px) was derived by fitting a circle to the
corner pixels of the reference border image supplied for this device
(174×196): an algebraic (Kasa) circle fit over the top-left corner's
arc gives center ≈ (32.7, 30.4), radius ≈ 31.3, consistent with a
~2px outer offset and a ~31px radius. `PreviewRenderer.ts` was also
generalized from a device-specific fixed scale factor to a fit-based
scale (`min(outW/canvasW, outH/canvasH) * 0.95`) so the same code path
correctly produces both devices' preview sizes.

IDW13's border color/width were also fitted from that reference image,
after an initial version reused IDW20's solid `rgb(128,128,128)`
width-3 stroke and looked visibly too bold/thick on the smaller
174×196 canvas. Sampling the reference's border pixels gives a peak
brightness of ~50/255 — almost exactly `rgb(128,128,128)` at ~40%
opacity (128 × 0.4 ≈ 51) — over a narrower ~2px line, rather than a
solid width-3 stroke. `DEVICE_PROFILES` now carries `previewBorderColor`
/ `previewBorderWidth` per device instead of a single hardcoded style.

Switching device on an already-open project does not rescale existing
widgets' `x`/`y`/`w`/`h` — it only updates canvas size, future
defaults, and export dimensions going forward. It also updates the
`description` field to match the new `deviceId` (both start out equal
— e.g. `"IDW20"` — when a project is created), unless you've already
customized `description` to something else, in which case your text
is left alone.

## Faithful behaviors carried over

- **iwf.json formatting**: exact key ordering per widget type
  (`watch` / `custom` / generic), 4-space nested indent, `item` array
  formatting — matches `pretty_json()` exactly so exports stay
  byte-compatible with IDO devices.
- **Image-based fonts only**: digits/letters for `time`, `hour`,
  `date`, `weather`, etc. are always composited from the widget's own
  PNG/BMP glyph strip, never `<canvas>` text or system fonts, per
  `CLAUDE.md`.
- **Special glyph mapping**: `:` `/` `%` `.` `-` `°` all map to glyph
  key `"10"`; the two weather private-use characters map to `"11"`/`"12"`.
- **Clock hands**: same center/anchor pivot model, same angle formulas
  (`hourAngle = (hour%12 + min/60) * 30`, etc.), same "only the last
  watch widget in the list drives the hands" rule.
- **Coming-soon types** (`redpoint`, `anima`, `multimeter`, `gradient`,
  `shortcut`, `sleep`, `bluetooth`) are still blocked with the same
  message when adding a custom widget.
- **font.json**: same `{"item":[{"name","bpp","format"}, ...]}` shape,
  `bpp: 16` default, format taken from the first uploaded file's
  extension.
- 240×284 (IDW13) or 320×385 (IDW20) internal canvas per the selected
  device, not scaled.

## Deliberate differences from the desktop app

Browser apps can't touch the filesystem (per `CLAUDE.md`), so:

- **"Save iwf.json" / "Save font.json"** download the file via a Blob
  URL instead of writing into `project_dir`.
- **"Open Project…"** uses a directory picker (`<input webkitdirectory>`)
  instead of a single `iwf.json` file dialog, since the app needs the
  sibling image files too (backgrounds, hand images, glyph strips) —
  this is the closest browser equivalent of "open project_dir".
- All uploaded assets (background, hand images, glyph strips) live in
  an in-memory `ProjectFiles` table instead of being copied into a
  folder on disk, and are bundled into the ZIP export from there.

Two small bugs in the original were fixed rather than reproduced,
since faithfully reproducing a bug seemed less useful than the app's
evident intent — both are called out again inline in `IWFExporter.ts`:

1. `on_create_zip_file()` looked for the background file under a
   hard-coded name, `files0.png`, instead of the actual `bkground`
   field. That only worked for the *first* background ever uploaded in
   a session; re-uploading (`files1.png`, `files2.png`, ...) silently
   broke ZIP export. This port reads the real filename from `bkground`.
2. `on_save_preview()` generated `preview.png` but never actually
   wrote it into the ZIP (the original has an `# Add preview image`
   comment followed by unused code). This port includes it.

## Added, not present in the original

- **Delete widget** — the desktop UI had a "Supprimer Widget" button
  wired up in `set_project_controls_enabled()`, but no `clicked` handler
  was ever connected to it in the source provided, so it did nothing.
  A working delete was added here since it's clearly intended
  functionality for a "production-quality" editor.

## Known gaps / follow-ups

- `ring` / `progressbar` widgets get the same generic dashed-placeholder
  treatment the original gave them (no custom renderer existed for
  them in the Python source either — only `watch` and `custom` widgets
  were ever actually rendered).
- The background "corner matcher" helper (`BackgroundHelperDialog.tsx`)
  is a visual aid only, same as `bkground_helper.py` — it doesn't
  write anything back into the project.
