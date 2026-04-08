"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

import { socialLinks } from "@/lib/constants";
import {
  hasValidationErrors,
  initialContactValues,
  normalizeContactValues,
  validateContactValues,
  type ContactFormErrors,
  type ContactFormValues,
  type SubmissionResponse,
} from "@/lib/forms";
import { cn } from "@/lib/utils";

export function ContactShowcase() {
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [values, setValues] = useState<ContactFormValues>(initialContactValues);

  const hasValues = useMemo(
    () => Object.values(values).some((value) => value.trim().length > 0),
    [values],
  );

  const updateField = <TKey extends keyof ContactFormValues>(
    key: TKey,
    value: ContactFormValues[TKey],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatusMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = normalizeContactValues(values);
    const nextErrors = validateContactValues(normalized);
    setValues(normalized);
    setErrors(nextErrors);
    setStatusMessage(null);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(normalized),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result =
        (await response.json()) as SubmissionResponse<ContactFormErrors>;

      if (!response.ok || !result.success) {
        setErrors(result.success ? {} : (result.errors ?? {}));
        setStatusMessage(result.message);
        setIsSubmitted(false);
        return;
      }

      setErrors({});
      setIsSubmitted(true);
      setStatusMessage(result.message);
      setValues(initialContactValues);
    } catch {
      setIsSubmitted(false);
      setStatusMessage(
        "We couldn't send your message right now. Please try again in a moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-brand-black pb-24 pt-28 sm:pb-28 lg:pb-30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,255,71,0.08),transparent_24%),radial-gradient(circle_at_80%_12%,rgba(255,83,54,0.1),transparent_20%),#0A0A0A]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.22]" />

      <div className="container-shell relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/38">
          <Link href="/" className="transition hover:text-white/70">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/74">Contact</span>
        </nav>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <p className="eyebrow">Contact / Final Polish</p>
            <h1 className="font-display text-[clamp(4.5rem,11vw,8rem)] uppercase leading-[0.84] tracking-[0.08em] text-brand-white">
              Let&apos;s Build The Next Drop.
            </h1>
            <p className="max-w-xl text-base leading-8 text-white/66">
              Reach out for launch concepts, motion systems, branded commerce,
              or collaborative editorial work. We answer with the same clarity
              we design with.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="button"
                    className="group flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-brand-accent/30 hover:bg-white/[0.06]"
                  >
                    <span className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-white">
                      {link.label}
                    </span>
                    <span className="translate-x-0 text-brand-accent transition group-hover:translate-x-1">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-panel backdrop-blur-xl sm:p-8">
            {isSubmitted ? (
              <div className="flex min-h-[32rem] flex-col items-center justify-center text-center">
                <motion.svg
                  width="88"
                  height="88"
                  viewBox="0 0 88 88"
                  fill="none"
                  className="mb-6"
                >
                  <circle
                    cx="44"
                    cy="44"
                    r="42"
                    stroke="rgba(232,255,71,0.24)"
                    strokeWidth="2"
                  />
                  <motion.path
                    d="M24 45L38 58L64 31"
                    stroke="#E8FF47"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </motion.svg>
                <p className="font-display text-5xl uppercase leading-none text-brand-white">
                  Message Sent
                </p>
                <p className="mt-4 max-w-md text-base leading-8 text-white/66">
                  {statusMessage ||
                    "Thanks for reaching out. We'll get back to you with next steps and timing shortly."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setStatusMessage(null);
                  }}
                  data-cursor="button"
                  className="mt-8 rounded-pill border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-5">
                <FloatingField
                  error={errors.name}
                  id="name"
                  label="Name"
                  value={values.name}
                  onChange={(value) => updateField("name", value)}
                />
                <FloatingField
                  error={errors.email}
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={(value) => updateField("email", value)}
                />
                <FloatingField
                  error={errors.subject}
                  id="subject"
                  label="Subject"
                  value={values.subject}
                  onChange={(value) => updateField("subject", value)}
                />
                <FloatingTextarea
                  error={errors.message}
                  id="message"
                  label="Project Brief"
                  value={values.message}
                  onChange={(value) => updateField("message", value)}
                />
                <p
                  aria-live="polite"
                  className={`min-h-5 text-sm ${
                    statusMessage ? "text-brand-ember" : "text-white/50"
                  }`}
                >
                  {statusMessage ||
                    "Share the project scope and we'll route it to the right team."}
                </p>
                <button
                  type="submit"
                  data-cursor="button"
                  disabled={isSubmitting}
                  className={cn(
                    "flex h-14 w-full items-center justify-center gap-2 rounded-pill font-semibold uppercase tracking-[0.26em] transition",
                    hasValues
                      ? "bg-brand-accent text-brand-black shadow-glow"
                      : "bg-brand-white text-brand-black",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send Message
                      <Check className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type FloatingFieldProps = {
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  type?: string;
  value: string;
};

function FloatingField({
  error,
  id,
  label,
  onChange,
  type = "text",
  value,
}: FloatingFieldProps) {
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer h-14 w-full rounded-[1.4rem] border border-white/10 bg-black/25 px-5 pt-5 text-sm text-brand-white outline-none transition placeholder:text-transparent focus:border-brand-accent/40"
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-5 top-4 origin-left text-sm text-white/42 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:scale-[0.82] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-[0.82]"
        >
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-brand-ember">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FloatingTextarea({
  error,
  id,
  label,
  onChange,
  value,
}: Omit<FloatingFieldProps, "type">) {
  return (
    <div>
      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder=" "
          rows={6}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer w-full rounded-[1.6rem] border border-white/10 bg-black/25 px-5 pt-6 text-sm text-brand-white outline-none transition placeholder:text-transparent focus:border-brand-accent/40"
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-5 top-4 origin-left text-sm text-white/42 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:scale-[0.82] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-[0.82]"
        >
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-brand-ember">
          {error}
        </p>
      ) : null}
    </div>
  );
}
