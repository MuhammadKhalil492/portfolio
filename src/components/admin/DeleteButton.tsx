"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<void>;
  label: string;
}

export function DeleteButton({ id, action, label }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={async () => {
            await action(id);
            setConfirming(false);
          }}
          className="rounded-lg bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-500"
        >
          Delete
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-lg bg-zinc-800 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-700"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-600/10 hover:text-red-400"
      title={`Delete ${label}`}
    >
      <Trash2 size={16} />
    </button>
  );
}
