"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm text-zinc-400">Project Image</label>
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="h-40 w-full rounded-lg border border-zinc-800 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-900 text-zinc-400 transition-colors hover:border-zinc-500"
        >
          {uploading ? (
            <p className="text-sm">Uploading...</p>
          ) : (
            <>
              <Upload size={24} className="mb-2" />
              <p className="text-sm">Click to upload image</p>
              <p className="mt-1 text-xs text-zinc-500">PNG, JPG, WebP</p>
            </>
          )}
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />
      <div className="mt-2 flex items-center gap-2">
        <ImageIcon size={14} className="text-zinc-500" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL"
          className="flex-1 rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
