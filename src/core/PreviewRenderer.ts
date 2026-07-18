import { CANVAS_H, CANVAS_W } from "../iwf/types";
import { ProjectState } from "./Scene";
import { renderScene } from "./Renderer";

const OUT_W = 272;
const OUT_H = 324;
const SCALE = 0.95;
const CORNER_RADIUS = 67;

function strokeRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.stroke();
}

/**
 * Port of MainWindow.on_save_preview(): renders the 320x385 scene
 * (without the yellow selection box), scales it down 95% onto a
 * 272x324 black canvas, and draws a rounded gray border on top.
 * Returns a PNG Blob ready to save as preview.png.
 */
export async function renderPreviewPng(
  state: ProjectState,
  imageCache: Map<string, HTMLImageElement>,
): Promise<Blob> {
  const sceneCanvas = document.createElement("canvas");
  sceneCanvas.width = CANVAS_W;
  sceneCanvas.height = CANVAS_H;
  const sceneCtx = sceneCanvas.getContext("2d")!;
  renderScene(sceneCtx, state, imageCache, { showHighlight: false });

  const scaledW = Math.round(CANVAS_W * SCALE);
  const scaledH = Math.round(CANVAS_H * SCALE);

  const out = document.createElement("canvas");
  out.width = OUT_W;
  out.height = OUT_H;
  const ctx = out.getContext("2d")!;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, OUT_W, OUT_H);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  const offX = Math.floor((OUT_W - scaledW) / 2);
  const offY = Math.floor((OUT_H - scaledH) / 2);
  ctx.drawImage(sceneCanvas, 0, 0, CANVAS_W, CANVAS_H, offX, offY, scaledW, scaledH);

  ctx.strokeStyle = "rgb(128, 128, 128)";
  ctx.lineWidth = 3;
  strokeRoundedRect(ctx, 2, 2, OUT_W - 4, OUT_H - 4, CORNER_RADIUS);

  return new Promise((resolve, reject) => {
    out.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to encode preview.png"));
    }, "image/png");
  });
}
