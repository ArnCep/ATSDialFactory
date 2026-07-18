import { useState } from "react";
import Modal from "./Modal";

interface Props {
  onCreate: (name: string) => void;
  onCancel: () => void;
}

export default function NewProjectDialog({ onCreate, onCancel }: Props) {
  const [name, setName] = useState("");

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      alert("Project name cannot be empty.");
      return;
    }
    onCreate(trimmed);
  };

  return (
    <Modal title="New Project" onClose={onCancel}>
      <div className="form-row">
        <label>Please enter a name:</label>
        <input
          type="text" autoFocus value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        />
      </div>
      <div className="actions">
        <button className="primary" onClick={submit}>Create</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </Modal>
  );
}
