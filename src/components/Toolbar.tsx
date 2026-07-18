import { ChangeEvent, useRef } from "react";
import { PreviewTime } from "../iwf/types";

interface Props {
  projectOpen: boolean;
  status: string;
  previewTime: PreviewTime;
  onNewProject: () => void;
  onOpenProjectFolder: (files: FileList) => void;
  onSaveIwfJson: () => void;
  onSaveFontJson: () => void;
  onCreateZip: () => void;
  onSavePreview: () => void;
  onUploadBackground: (file: File) => void;
  onEditBackground: () => void;
  onPreviewTimeChange: (time: PreviewTime) => void;
}

export default function Toolbar({
  projectOpen, status, previewTime,
  onNewProject, onOpenProjectFolder, onSaveIwfJson, onSaveFontJson,
  onCreateZip, onSavePreview, onUploadBackground, onEditBackground,
  onPreviewTimeChange,
}: Props) {
  const folderInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleFolderChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) onOpenProjectFolder(e.target.files);
    e.target.value = "";
  };
  const handleBgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) onUploadBackground(e.target.files[0]);
    e.target.value = "";
  };

  const timePart = (t: PreviewTime, part: "hour" | "minute" | "second", v: number) =>
    onPreviewTimeChange({ ...t, [part]: v });

  return (
    <div className="toolbar">
      <div className="title">ATSDialFactory</div>

      <div className="group">
        <button onClick={onNewProject}>New Project</button>
        <button onClick={() => folderInputRef.current?.click()}>Open Project…</button>
        <input
          ref={folderInputRef}
          type="file"
          // @ts-expect-error non-standard attribute for directory selection
          webkitdirectory=""
          directory=""
          multiple
          style={{ display: "none" }}
          onChange={handleFolderChange}
        />
      </div>

      <div className="group">
        <button disabled={!projectOpen} onClick={onSaveIwfJson}>Save iwf.json</button>
        <button disabled={!projectOpen} onClick={onSaveFontJson}>Save font.json</button>
        <button disabled={!projectOpen} onClick={onCreateZip}>Create ZIP</button>
        <button disabled={!projectOpen} onClick={onSavePreview}>Save Preview</button>
      </div>

      <div className="group">
        <button disabled={!projectOpen} onClick={() => bgInputRef.current?.click()}>Upload Background</button>
        <input ref={bgInputRef} type="file" accept=".png,.bmp" style={{ display: "none" }} onChange={handleBgChange} />
        <button disabled={!projectOpen} onClick={onEditBackground}>Edit Background…</button>
      </div>

      <div className="group">
        <label>Preview time</label>
        <input
          type="number" min={0} max={23} style={{ width: 44 }}
          value={previewTime.hour}
          onChange={(e) => timePart(previewTime, "hour", clamp(+e.target.value, 0, 23))}
        />
        :
        <input
          type="number" min={0} max={59} style={{ width: 44 }}
          value={previewTime.minute}
          onChange={(e) => timePart(previewTime, "minute", clamp(+e.target.value, 0, 59))}
        />
        :
        <input
          type="number" min={0} max={59} style={{ width: 44 }}
          value={previewTime.second}
          onChange={(e) => timePart(previewTime, "second", clamp(+e.target.value, 0, 59))}
        />
      </div>

      <div className="spacer" />
      <div className="status" title={status}>{status}</div>
    </div>
  );
}

function clamp(v: number, min: number, max: number) {
  if (Number.isNaN(v)) return min;
  return Math.min(max, Math.max(min, v));
}
