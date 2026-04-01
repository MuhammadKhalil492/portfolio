"use client";

import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Save, Upload, FileText } from "lucide-react";
import { updateSettings } from "@/actions/settings";
import { ImageUpload } from "./ImageUpload";

interface SettingsFormProps {
  settings: {
    logo: string;
    siteName: string;
    footerText: string;
    footerSubtext: string;
    heroName: string;
    heroGreeting: string;
    heroTagline: string;
    heroRoles: string;
    aboutBio: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    resumeUrl: string;
  };
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();

  const [logo, setLogo] = useState(settings.logo);
  const [siteName, setSiteName] = useState(settings.siteName);
  const [footerText, setFooterText] = useState(settings.footerText);
  const [footerSubtext, setFooterSubtext] = useState(settings.footerSubtext);
  const [heroName, setHeroName] = useState(settings.heroName);
  const [heroGreeting, setHeroGreeting] = useState(settings.heroGreeting);
  const [heroTagline, setHeroTagline] = useState(settings.heroTagline);
  const [heroRoles, setHeroRoles] = useState<string[]>(
    JSON.parse(settings.heroRoles || "[]")
  );
  const [aboutBio, setAboutBio] = useState<string[]>(
    JSON.parse(settings.aboutBio || "[]")
  );
  const [email, setEmail] = useState(settings.email);
  const [phone, setPhone] = useState(settings.phone);
  const [location, setLocation] = useState(settings.location);
  const [linkedin, setLinkedin] = useState(settings.linkedin);
  const [github, setGithub] = useState(settings.github);
  const [resumeUrl, setResumeUrl] = useState(settings.resumeUrl);
  const [resumeUploading, setResumeUploading] = useState(false);
  const resumeRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleResumeUpload(file: File) {
    setResumeUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setResumeUrl(data.url);
    } catch (err) {
      console.error("Resume upload failed:", err);
    } finally {
      setResumeUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    await updateSettings({
      logo,
      siteName,
      footerText,
      footerSubtext,
      heroName,
      heroGreeting,
      heroTagline,
      heroRoles: heroRoles.filter((r) => r.trim()),
      aboutBio: aboutBio.filter((b) => b.trim()),
      email,
      phone,
      location,
      linkedin,
      github,
      resumeUrl,
    });

    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 3000);
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none";
  const labelClass = "mb-1.5 block text-sm text-zinc-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Branding */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Branding</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <ImageUpload value={logo} onChange={setLogo} />
          </div>
          <div>
            <label className={labelClass}>Site Name (Navbar)</label>
            <input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className={inputClass}
              placeholder="Khalil."
            />
          </div>
          <div>
            <label className={labelClass}>Resume / CV</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => resumeRef.current?.click()}
                disabled={resumeUploading}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 disabled:opacity-60"
              >
                <Upload size={14} />
                {resumeUploading ? "Uploading..." : "Upload PDF"}
              </button>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
                >
                  <FileText size={14} />
                  {resumeUrl.split("/").pop()}
                </a>
              )}
            </div>
            <input
              ref={resumeRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleResumeUpload(file);
              }}
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Hero Section</h2>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Greeting Text</label>
              <input
                value={heroGreeting}
                onChange={(e) => setHeroGreeting(e.target.value)}
                className={inputClass}
                placeholder="Hello, I'm"
              />
            </div>
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                className={inputClass}
                placeholder="Muhammad Khalil Safi"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Tagline</label>
            <input
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              className={inputClass}
              placeholder="Building scalable web applications..."
            />
          </div>
          <div>
            <label className={labelClass}>Rotating Roles</label>
            <div className="space-y-2">
              {heroRoles.map((role, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={role}
                    onChange={(e) => {
                      const updated = [...heroRoles];
                      updated[i] = e.target.value;
                      setHeroRoles(updated);
                    }}
                    className={inputClass}
                    placeholder="e.g. Full Stack Developer"
                  />
                  {heroRoles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setHeroRoles(heroRoles.filter((_, j) => j !== i))}
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
              onClick={() => setHeroRoles([...heroRoles, ""])}
              className="mt-2 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
            >
              <Plus size={14} />
              Add Role
            </button>
          </div>
        </div>
      </section>

      {/* About Bio */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">About Section</h2>
        <div>
          <label className={labelClass}>Bio Paragraphs</label>
          <div className="space-y-2">
            {aboutBio.map((para, i) => (
              <div key={i} className="flex items-start gap-2">
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => {
                    const updated = [...aboutBio];
                    updated[i] = e.target.value;
                    setAboutBio(updated);
                  }}
                  className={inputClass + " resize-none"}
                  placeholder="Bio paragraph..."
                />
                {aboutBio.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setAboutBio(aboutBio.filter((_, j) => j !== i))}
                    className="mt-2 shrink-0 text-zinc-500 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setAboutBio([...aboutBio, ""])}
            className="mt-2 inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
          >
            <Plus size={14} />
            Add Paragraph
          </button>
        </div>
      </section>

      {/* Contact Info */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Contact Info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="+92 xxx xxxxxxx"
            />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
              placeholder="Lahore, Pakistan"
            />
          </div>
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className={inputClass}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>GitHub URL</label>
            <input
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className={inputClass}
              placeholder="https://github.com/..."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Footer</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Copyright Text</label>
            <input
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              className={inputClass}
              placeholder="Muhammad Khalil Safi. All rights reserved."
            />
          </div>
          <div>
            <label className={labelClass}>Footer Subtext</label>
            <input
              value={footerSubtext}
              onChange={(e) => setFooterSubtext(e.target.value)}
              className={inputClass}
              placeholder="Built with Next.js & Tailwind CSS"
            />
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-60"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Settings"}
        </button>
        {saved && (
          <span className="text-sm text-green-400">Settings saved successfully!</span>
        )}
      </div>
    </form>
  );
}
