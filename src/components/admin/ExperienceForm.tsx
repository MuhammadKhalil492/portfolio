"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ArrowLeft } from "lucide-react";
import { createExperience, updateExperience } from "@/actions/experience";
import Link from "next/link";

interface ExperienceFormProps {
  initialData?: {
    id: string;
    role: string;
    company: string;
    location: string;
    period: string;
    description: string;
    highlights: string;
    displayOrder: number;
    visible: boolean;
  };
}

export function ExperienceForm({ initialData }: ExperienceFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [role, setRole] = useState(initialData?.role || "");
  const [company, setCompany] = useState(initialData?.company || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [period, setPeriod] = useState(initialData?.period || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [highlights, setHighlights] = useState<string[]>(
    initialData ? JSON.parse(initialData.highlights) : [""]
  );
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder || 0);
  const [visible, setVisible] = useState(initialData?.visible ?? true);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    const data = {
      role,
      company,
      location,
      period,
      description,
      highlights: highlights.filter((h) => h.trim()),
      displayOrder,
      visible,
    };

    if (isEditing) {
      await updateExperience(initialData.id, data);
    } else {
      await createExperience(data);
    }

    router.push("/admin/experience");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none";

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/experience"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to Experience
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-white">
          {isEditing ? "Edit Experience" : "Add Experience"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Role</label>
            <input
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={inputClass}
              placeholder="e.g. Full Stack Developer"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Company</label>
            <input
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
              placeholder="e.g. Equal Pixels"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Location</label>
            <input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
              placeholder="e.g. Lahore"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Period</label>
            <input
              required
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className={inputClass}
              placeholder="e.g. 2023 — Present"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">Description</label>
          <textarea
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass + " resize-none"}
            placeholder="Brief role description"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">Highlights</label>
          <div className="space-y-2">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={h}
                  onChange={(e) => {
                    const updated = [...highlights];
                    updated[i] = e.target.value;
                    setHighlights(updated);
                  }}
                  className={inputClass}
                  placeholder="Highlight / achievement"
                />
                {highlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setHighlights(highlights.filter((_, j) => j !== i))}
                    className="shrink-0 text-zinc-500 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setHighlights([...highlights, ""])}
            className="mt-2 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
          >
            <Plus size={14} />
            Add Highlight
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Display Order</label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 pb-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-900"
              />
              Visible on portfolio
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditing ? "Update" : "Create"}
          </button>
          <Link
            href="/admin/experience"
            className="rounded-lg bg-zinc-800 px-6 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
