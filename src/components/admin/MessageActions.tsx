"use client";

import { CheckCheck, Trash2, Reply } from "lucide-react";
import { markAsRead, deleteMessage } from "@/actions/messages";
import { useState } from "react";

interface MessageActionsProps {
  id: string;
  read: boolean;
  email: string;
}

export function MessageActions({ id, read, email }: MessageActionsProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <a
        href={`mailto:${email}`}
        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        title="Reply via email"
      >
        <Reply size={16} />
      </a>
      {!read && (
        <button
          onClick={() => markAsRead(id)}
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-green-400"
          title="Mark as read"
        >
          <CheckCheck size={16} />
        </button>
      )}
      {confirming ? (
        <div className="flex items-center gap-1">
          <button
            onClick={async () => {
              await deleteMessage(id);
              setConfirming(false);
            }}
            className="rounded-lg bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="rounded-lg bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-600/10 hover:text-red-400"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
