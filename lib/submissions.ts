import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import type { ContactFormValues, NewsletterFormValues } from "@/lib/forms";

type SubmissionKind = "contact" | "newsletter";

type SubmissionPayloadMap = {
  contact: ContactFormValues;
  newsletter: NewsletterFormValues;
};

const storageDirectory =
  process.env.STRYDE_SUBMISSIONS_DIR ||
  path.join(process.cwd(), ".stryde-data");

const webhookConfig: Record<SubmissionKind, string | undefined> = {
  contact: process.env.STRYDE_CONTACT_WEBHOOK_URL,
  newsletter: process.env.STRYDE_NEWSLETTER_WEBHOOK_URL,
};

export async function saveSubmission<K extends SubmissionKind>(
  kind: K,
  payload: SubmissionPayloadMap[K],
) {
  const submittedAt = new Date().toISOString();
  const webhookUrl = webhookConfig[kind];

  if (webhookUrl) {
    await sendToWebhook(webhookUrl, {
      id: crypto.randomUUID(),
      kind,
      payload,
      submittedAt,
    });

    return { delivery: "webhook" as const, submittedAt };
  }

  await mkdir(storageDirectory, { recursive: true });
  await appendFile(
    path.join(storageDirectory, `${kind}.jsonl`),
    `${JSON.stringify({
      id: crypto.randomUUID(),
      kind,
      payload,
      submittedAt,
    })}\n`,
    "utf8",
  );

  return { delivery: "filesystem" as const, submittedAt };
}

async function sendToWebhook(url: string, body: object) {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Webhook request failed with status ${response.status}`);
  }
}
