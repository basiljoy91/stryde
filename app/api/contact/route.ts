import { NextResponse } from "next/server";

import {
  hasValidationErrors,
  normalizeContactValues,
  validateContactValues,
  type ContactFormErrors,
  type SubmissionResponse,
} from "@/lib/forms";
import { saveSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await parseJsonBody(request);

  if (!payload) {
    return NextResponse.json<SubmissionResponse<ContactFormErrors>>(
      {
        message: "Invalid request body.",
        success: false,
      },
      { status: 400 },
    );
  }

  const values = normalizeContactValues(payload);
  const errors = validateContactValues(values);

  if (hasValidationErrors(errors)) {
    return NextResponse.json<SubmissionResponse<ContactFormErrors>>(
      {
        errors,
        message: "Please correct the highlighted fields.",
        success: false,
      },
      { status: 400 },
    );
  }

  try {
    await saveSubmission("contact", values);

    return NextResponse.json<SubmissionResponse<ContactFormErrors>>({
      message: "Thanks for reaching out. We'll get back to you shortly.",
      success: true,
    });
  } catch (error) {
    console.error("Failed to process contact submission:", error);

    return NextResponse.json<SubmissionResponse<ContactFormErrors>>(
      {
        message:
          "We couldn't send your message right now. Please try again in a moment.",
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
