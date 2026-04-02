import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSkillCategory } from "@/actions/skills";

export const dynamic = "force-dynamic";

export default async function AdminSkills() {
  let categories: Awaited<ReturnType<typeof prisma.skillCategory.findMany>> = [];
  try {
    categories = await prisma.skillCategory.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch {
    // DB unavailable
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          <Plus size={16} />
          Add Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <p className="text-zinc-400">No skill categories yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => {
            const skills: string[] = JSON.parse(cat.skills);
            return (
              <div
                key={cat.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{cat.category}</h3>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/skills/${cat.id}`}
                      className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      id={cat.id}
                      action={deleteSkillCategory}
                      label="category"
                    />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
