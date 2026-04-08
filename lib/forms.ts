export type ContactFormValues = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type NewsletterFormValues = {
  email: string;
};

export type NewsletterFormErrors = Partial<
  Record<keyof NewsletterFormValues, string>
>;

export type SubmissionResponse<TErrors> =
  | {
      message: string;
      success: true;
    }
  | {
      errors?: TErrors;
      message: string;
      success: false;
    };

const emailPattern = /^\S+@\S+\.\S+$/;

export const initialContactValues: ContactFormValues = {
  email: "",
  message: "",
  name: "",
  subject: "",
};

export const initialNewsletterValues: NewsletterFormValues = {
  email: "",
};

export function normalizeContactValues(
  input: Partial<ContactFormValues>,
): ContactFormValues {
  return {
    email: normalizeString(input.email),
    message: normalizeMultilineString(input.message),
    name: normalizeString(input.name),
    subject: normalizeString(input.subject),
  };
}

export function normalizeNewsletterValues(
  input: Partial<NewsletterFormValues>,
): NewsletterFormValues {
  return {
    email: normalizeString(input.email),
  };
}

export function validateContactValues(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name) {
    errors.name = "Please add your name.";
  }

  if (!values.email) {
    errors.email = "Please add your email.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Use a valid email address.";
  }

  if (!values.subject) {
    errors.subject = "Please choose a subject.";
  }

  if (!values.message) {
    errors.message = "Tell us what you are working on.";
  } else if (values.message.length < 20) {
    errors.message = "Add a little more detail so we can respond well.";
  }

  return errors;
}

export function validateNewsletterValues(
  values: NewsletterFormValues,
): NewsletterFormErrors {
  const errors: NewsletterFormErrors = {};

  if (!values.email) {
    errors.email = "Please add your email.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Use a valid email address.";
  }

  return errors;
}

export function hasValidationErrors(
  errors: Record<string, string | undefined>,
): boolean {
  return Object.values(errors).some(Boolean);
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeMultilineString(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\r\n/g, "\n") : "";
}
