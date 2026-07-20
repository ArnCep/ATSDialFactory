import { useEffect, useRef } from "react";
import { ProjectState, deviceProfileOf } from "../core/Scene";
import { renderScene } from "../core/Renderer";

interface Props {
  state: ProjectState;
  imageCache: Map<string, HTMLImageElement>;
  tick: number;
}

export default function WatchCanvas({ state, imageCache, tick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const profile = deviceProfileOf(state);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    renderScene(ctx, state, imageCache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return (
    <canvas
      ref={canvasRef}
      width={profile.canvasW}
      height={profile.canvasH}
      className="watch-canvas-frame"
    />
  );
}
