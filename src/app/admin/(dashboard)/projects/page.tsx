import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProject } from "@/actions/projects";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch {
    // DB unavailable
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          <Plus size={16} />
          Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <p className="text-zinc-400">No projects yet. Add your first project.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => {
            const tech: string[] = JSON.parse(project.tech);
            return (
              <div
                key={project.id}
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-16 w-24 shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{project.title}</h3>
                    {!project.visible && (
                      <span className="rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-400">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400">{project.subtitle}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {tech.map((t: string) => (
                      <span
                        key={t}
                        className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={project.id} action={deleteProject} label="project" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
