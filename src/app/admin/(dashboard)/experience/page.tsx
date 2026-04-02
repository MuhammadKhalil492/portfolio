import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteExperience } from "@/actions/experience";

export const dynamic = "force-dynamic";

export default async function AdminExperience() {
  let experiences: Awaited<ReturnType<typeof prisma.experience.findMany>> = [];
  try {
    experiences = await prisma.experience.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch {
    // DB unavailable
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Experience</h1>
        <Link
          href="/admin/experience/new"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          <Plus size={16} />
          Add Experience
        </Link>
      </div>

      {experiences.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <p className="text-zinc-400">No experience entries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{exp.role}</h3>
                  {!exp.visible && (
                    <span className="rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-400">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400">
                  {exp.company}, {exp.location} &middot; {exp.period}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/experience/${exp.id}`}
                  className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
                >
                  Edit
                </Link>
                <DeleteButton id={exp.id} action={deleteExperience} label="experience" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
