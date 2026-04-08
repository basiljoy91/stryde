"use client";

import { useMemo, useState } from "react";

import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  hasValidationErrors,
  initialNewsletterValues,
  normalizeNewsletterValues,
  validateNewsletterValues,
  type NewsletterFormErrors,
  type SubmissionResponse,
} from "@/lib/forms";

export function NewsletterSignup() {
  const [email, setEmail] = useState(initialNewsletterValues.email);
  const [error, setError] = useState<NewsletterFormErrors["email"]>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const hasValue = useMemo(() => email.trim().length > 0, [email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = normalizeNewsletterValues({ email });
    const nextErrors = validateNewsletterValues(normalized);
    setEmail(normalized.email);
    setError(nextErrors.email);
    setStatusMessage(null);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        body: JSON.stringify(normalized),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result =
        (await response.json()) as SubmissionResponse<NewsletterFormErrors>;

      if (!response.ok || !result.success) {
        setError(result.success ? undefined : result.errors?.email);
        setStatusMessage(result.message);
        setIsSubmitted(false);
        return;
      }

      setEmail(initialNewsletterValues.email);
      setError(undefined);
      setIsSubmitted(true);
      setStatusMessage(result.message);
    } catch {
      setIsSubmitted(false);
      setStatusMessage(
        "We couldn't save your signup right now. Please try again in a moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError(undefined);
            setStatusMessage(null);
            setIsSubmitted(false);
          }}
          placeholder="you@example.com"
          aria-invalid={Boolean(error)}
          aria-describedby="newsletter-feedback"
          className="h-12 w-full rounded-pill border border-white/12 bg-white/[0.04] px-5 text-sm text-brand-white outline-none transition placeholder:text-brand-muted focus:border-brand-accent/45"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
              Joining
            </>
          ) : isSubmitted ? (
            <>
              Joined
              <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              Join Now
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      <p
        id="newsletter-feedback"
        aria-live="polite"
        className={`min-h-5 text-sm ${
          error ? "text-brand-ember" : "text-white/60"
        }`}
      >
        {error ||
          statusMessage ||
          (hasValue
            ? "We'll only send release updates and previews."
            : "Early access, product notes, and limited-release alerts.")}
      </p>
    </form>
  );
}
