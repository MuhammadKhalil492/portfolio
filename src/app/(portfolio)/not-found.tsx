import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-extrabold text-foreground">404</h1>
      <p className="mt-4 text-lg text-foreground-muted">Page not found</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-light"
      >
        Go Home
      </Link>
    </div>
  );
}
