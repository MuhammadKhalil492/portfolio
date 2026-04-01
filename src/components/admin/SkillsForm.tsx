"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ArrowLeft } from "lucide-react";
import { createSkillCategory, updateSkillCategory } from "@/actions/skills";
import Link from "next/link";

interface SkillsFormProps {
  initialData?: {
    id: string;
    category: string;
    skills: string;
    displayOrder: number;
  };
}

export function SkillsForm({ initialData }: SkillsFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [category, setCategory] = useState(initialData?.category || "");
  const [skills, setSkills] = useState<string[]>(
    initialData ? JSON.parse(initialData.skills) : [""]
  );
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder || 0);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    const data = {
      category,
      skills: skills.filter((s) => s.trim()),
      displayOrder,
    };

    if (isEditing) {
      await updateSkillCategory(initialData.id, data);
    } else {
      await createSkillCategory(data);
    }

    router.push("/admin/skills");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none";

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/skills"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to Skills
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-white">
          {isEditing ? "Edit Category" : "Add Category"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Category Name</label>
            <input
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
              placeholder="e.g. Frontend, Backend, Languages"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Display Order</label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">Skills</label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-1">
                <input
                  value={skill}
                  onChange={(e) => {
                    const updated = [...skills];
                    updated[i] = e.target.value;
                    setSkills(updated);
                  }}
                  className="w-36 rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none"
                  placeholder="Skill name"
                />
                {skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setSkills(skills.filter((_, j) => j !== i))}
                    className="text-zinc-500 hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSkills([...skills, ""])}
            className="mt-2 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
          >
            <Plus size={14} />
            Add Skill
          </button>
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
            href="/admin/skills"
            className="rounded-lg bg-zinc-800 px-6 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
