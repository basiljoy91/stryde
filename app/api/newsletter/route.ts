import { NextResponse } from "next/server";

import {
  hasValidationErrors,
  normalizeNewsletterValues,
  validateNewsletterValues,
  type NewsletterFormErrors,
  type SubmissionResponse,
} from "@/lib/forms";
import { saveSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await parseJsonBody(request);

  if (!payload) {
    return NextResponse.json<SubmissionResponse<NewsletterFormErrors>>(
      {
        message: "Invalid request body.",
        success: false,
      },
      { status: 400 },
    );
  }

  const values = normalizeNewsletterValues(payload);
  const errors = validateNewsletterValues(values);

  if (hasValidationErrors(errors)) {
    return NextResponse.json<SubmissionResponse<NewsletterFormErrors>>(
      {
        errors,
        message: "Please correct the highlighted field.",
        success: false,
      },
      { status: 400 },
    );
  }

  try {
    await saveSubmission("newsletter", values);

    return NextResponse.json<SubmissionResponse<NewsletterFormErrors>>({
      message: "You're on the list for the next drop.",
      success: true,
    });
  } catch (error) {
    console.error("Failed to process newsletter signup:", error);

    return NextResponse.json<SubmissionResponse<NewsletterFormErrors>>(
      {
        message:
          "We couldn't save your signup right now. Please try again in a moment.",
        success: false,
      },
      { status: 500 },
    );
  }
}

async function parseJsonBody(request: Request) {
  try {
    const body = await request.json();
    return isRecord(body) ? body : null;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
