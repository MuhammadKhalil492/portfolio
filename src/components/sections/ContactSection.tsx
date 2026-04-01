"use client";

import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Globe, Code } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ContactConfig {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export function ContactSection({ config }: { config: ContactConfig }) {
  const contactCards = [
    {
      icon: Mail,
      label: "Email",
      value: config.email,
      href: `mailto:${config.email}`,
    },
    {
      icon: Phone,
      label: "Phone / WhatsApp",
      value: config.phone,
      href: `https://wa.me/${config.phone.replace(/\s|\+/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: config.location,
      href: null as string | null,
    },
    {
      icon: Globe,
      label: "LinkedIn",
      value: config.linkedin.replace("https://linkedin.com/in/", ""),
      href: config.linkedin,
    },
    {
      icon: Code,
      label: "GitHub",
      value: config.github.replace("https://github.com/", ""),
      href: config.github,
    },
  ];

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus("sent");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionWrapper id="contact" className="bg-background-secondary">
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a project in mind? Let's talk."
      />

      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {contactCards.map((card) => {
            const content = (
              <>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <card.icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-foreground-muted">{card.label}</p>
                  <p className="text-sm font-medium text-foreground">{card.value}</p>
                </div>
              </>
            );

            const className =
              "flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/50";

            return card.href ? (
              <a
                key={card.label}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            ) : (
              <div key={card.label} className={className}>
                {content}
              </div>
            );
          })}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            required
            value={formState.subject}
            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            required
            rows={5}
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-light disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
            <Send size={16} />
          </button>
          {status === "sent" && (
            <p className="text-sm text-green-500">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500">
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
