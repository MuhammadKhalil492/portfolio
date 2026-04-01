import { prisma } from "@/lib/prisma";
import { MessageActions } from "@/components/admin/MessageActions";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-sm text-zinc-400">
          {messages.filter((m) => !m.read).length} unread of {messages.length} total
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <p className="text-zinc-400">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl border bg-zinc-900/50 p-5 ${
                msg.read ? "border-zinc-800" : "border-indigo-500/30"
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {!msg.read && (
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    )}
                    <h3 className="font-semibold text-white">{msg.subject}</h3>
                  </div>
                  <p className="mt-0.5 text-sm text-zinc-400">
                    From: {msg.name} ({msg.email})
                  </p>
                  <p className="text-xs text-zinc-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <MessageActions id={msg.id} read={msg.read} email={msg.email} />
              </div>
              <p className="whitespace-pre-wrap text-sm text-zinc-300 leading-relaxed">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
