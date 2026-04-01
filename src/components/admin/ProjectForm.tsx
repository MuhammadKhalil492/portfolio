"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ArrowLeft } from "lucide-react";
import { createProject, updateProject } from "@/actions/projects";
import { ImageUpload } from "./ImageUpload";
import Link from "next/link";

interface ProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    features: string;
    tech: string;
    liveUrl: string;
    githubUrl: string;
    image: string;
    displayOrder: number;
    visible: boolean;
  };
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [features, setFeatures] = useState<string[]>(
    initialData ? JSON.parse(initialData.features) : [""]
  );
  const [tech, setTech] = useState<string[]>(
    initialData ? JSON.parse(initialData.tech) : [""]
  );
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder || 0);
  const [visible, setVisible] = useState(initialData?.visible ?? true);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    const data = {
      title,
      subtitle,
      description,
      features: features.filter((f) => f.trim()),
      tech: tech.filter((t) => t.trim()),
      liveUrl,
      githubUrl,
      image,
      displayOrder,
      visible,
    };

    if (isEditing) {
      await updateProject(initialData.id, data);
    } else {
      await createProject(data);
    }

    router.push("/admin/projects");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none";

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-white">
          {isEditing ? "Edit Project" : "Add Project"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Project title"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Subtitle</label>
            <input
              required
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className={inputClass}
              placeholder="e.g. B2B Marketplace"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">Description</label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass + " resize-none"}
            placeholder="Project description"
          />
        </div>

        <ImageUpload value={image} onChange={setImage} />

        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">Key Features</label>
          <div className="space-y-2">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={feature}
                  onChange={(e) => {
                    const updated = [...features];
                    updated[i] = e.target.value;
                    setFeatures(updated);
                  }}
                  className={inputClass}
                  placeholder="Feature description"
                />
                {features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setFeatures(features.filter((_, j) => j !== i))}
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
            onClick={() => setFeatures([...features, ""])}
            className="mt-2 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
          >
            <Plus size={14} />
            Add Feature
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-zinc-400">Tech Stack</label>
          <div className="flex flex-wrap gap-2">
            {tech.map((t, i) => (
              <div key={i} className="flex items-center gap-1">
                <input
                  value={t}
                  onChange={(e) => {
                    const updated = [...tech];
                    updated[i] = e.target.value;
                    setTech(updated);
                  }}
                  className="w-32 rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. React"
                />
                {tech.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setTech(tech.filter((_, j) => j !== i))}
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
            onClick={() => setTech([...tech, ""])}
            className="mt-2 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
          >
            <Plus size={14} />
            Add Tech
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">Live URL</label>
            <input
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className={inputClass}
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-zinc-400">GitHub URL</label>
            <input
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className={inputClass}
              placeholder="https://github.com/..."
            />
          </div>
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
            {saving ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
          </button>
          <Link
            href="/admin/projects"
            className="rounded-lg bg-zinc-800 px-6 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
