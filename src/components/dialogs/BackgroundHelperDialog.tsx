import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

interface Props {
  onClose: () => void;
}

const VIEW_W = 340;
const VIEW_H = 400;
const MAX_W = 320;
const MAX_H = 385;

/**
 * Port of BkgroundHelper (bkground_helper.py): a scratch canvas with a
 * rounded green guide border, used to visually check that a background
 * image's corners match the watch face's rounded-corner cutout before
 * committing it as the real background. This tool never writes to the
 * project — it's purely a visual aid, matching the original.
 */
export default function BackgroundHelperDialog({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    if (image) {
      const x = Math.floor((VIEW_W - MAX_W) / 2);
      const y = Math.floor((VIEW_H - MAX_H) / 2);
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.drawImage(image, x, y, MAX_W, MAX_H);
      ctx.restore();
    }

    const penWidth = 4;
    const smallerDim = Math.min(VIEW_W, VIEW_H);
    const radius = Math.floor((smallerDim * 0.5) / 2);
    const offset = penWidth / 2;

    ctx.strokeStyle = "rgb(0, 255, 0)";
    ctx.lineWidth = penWidth;
    ctx.lineJoin = "miter";
    ctx.lineCap = "square";
    roundedRectPath(ctx, offset, offset, VIEW_W - 2 * offset, VIEW_H - 2 * offset, radius);
    ctx.stroke();
  }, [image]);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (!/\.(png|bmp)$/i.test(file.name)) {
      alert("Select a valid image that's at least PNG or BMP");
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("load failed"));
      img.src = url;
    }).catch(() => alert("Failed to load the image file."));

    if (img.width > MAX_W || img.height > MAX_H) {
      alert("Image Too Large: Bad File");
      URL.revokeObjectURL(url);
      return;
    }
    setImage(img);
  };

  return (
    <Modal title="Bkground Corner Matcher" onClose={onClose}>
      <canvas
        ref={canvasRef}
        width={VIEW_W}
        height={VIEW_H}
        style={{ background: "#000", boxShadow: "0 0 0 1px var(--border)" }}
      />
      <div className="actions" style={{ justifyContent: "space-between" }}>
        <div>
          <button onClick={() => inputRef.current?.click()}>Upload Image</button>
          <input ref={inputRef} type="file" accept=".png,.bmp" style={{ display: "none" }}
                 onChange={(e) => onFile(e.target.files?.[0])} />
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
