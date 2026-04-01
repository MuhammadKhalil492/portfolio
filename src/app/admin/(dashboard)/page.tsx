import Link from "next/link";
import { FolderKanban, Briefcase, Code, MessageSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projectCount, experienceCount, skillCount, messageCount, unreadCount] =
    await Promise.all([
      prisma.project.count(),
      prisma.experience.count(),
      prisma.skillCategory.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);

  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Projects", count: projectCount, href: "/admin/projects", icon: FolderKanban, color: "text-blue-400" },
    { label: "Experience", count: experienceCount, href: "/admin/experience", icon: Briefcase, color: "text-green-400" },
    { label: "Skills", count: skillCount, href: "/admin/skills", icon: Code, color: "text-purple-400" },
    { label: "Messages", count: messageCount, href: "/admin/messages", icon: MessageSquare, color: "text-amber-400", badge: unreadCount },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Dashboard</h1>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700"
          >
            <div className="flex items-center justify-between">
              <stat.icon size={20} className={stat.color} />
              {stat.badge ? (
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                  {stat.badge} new
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{stat.count}</p>
            <p className="text-sm text-zinc-400">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Recent Messages</h2>
        {recentMessages.length === 0 ? (
          <p className="text-sm text-zinc-500">No messages yet.</p>
        ) : (
          <div className="space-y-2">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {!msg.read && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                    )}
                    <p className="truncate text-sm font-medium text-white">
                      {msg.subject}
                    </p>
                  </div>
                  <p className="truncate text-xs text-zinc-400">
                    {msg.name} &middot; {msg.email}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-zinc-500">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
