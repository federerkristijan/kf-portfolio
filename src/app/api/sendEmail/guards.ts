export type ContactFormPayload = {
  name: string;
  email: string;
  message: string;

  /**
   * Honeypot field: must be present and must be empty.
   * Bots often fill every field; humans never see it.
   */
  website?: string;
};

export type ValidationResult =
  | { ok: true; data: ContactFormPayload }
  | { ok: false; status: 400; error: string };

function hasLetter(value: string): boolean {
  return /\p{L}/u.test(value);
}

function isNumericOnly(value: string): boolean {
  return /^[0-9]+$/.test(value);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function lowEntropy(value: string): boolean {
  const uniqueChars = new Set(value).size;
  return uniqueChars < 4;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function validateContactFormPayload(body: unknown): ValidationResult {
  if (!isRecord(body)) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  const name = body.name;
  const email = body.email;
  const message = body.message;
  const websiteRaw = body.website;
  const website = typeof websiteRaw === "string" ? websiteRaw : "";

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  // Honeypot rule: must be empty
  if (website.trim() !== "") {
    return { ok: false, status: 400, error: "Bot detected" };
  }

  // Length constraints
  if (
    name.length < 2 ||
    name.length > 100 ||
    email.length < 5 ||
    email.length > 254 ||
    message.length < 5 ||
    message.length > 5000
  ) {
    return { ok: false, status: 400, error: "Invalid input length" };
  }

  // Reject numeric-only / no-letter content
  if (
    isNumericOnly(name) ||
    isNumericOnly(message) ||
    !hasLetter(name) ||
    !hasLetter(message)
  ) {
    return { ok: false, status: 400, error: "Suspicious content detected" };
  }

  // Email sanity
  if (!isValidEmail(email)) {
    return { ok: false, status: 400, error: "Invalid email address" };
  }

  const localPart = email.split("@")[0] ?? "";
  if (localPart !== "" && isNumericOnly(localPart)) {
    return { ok: false, status: 400, error: "Invalid email address" };
  }

  // Low-entropy spam payload
  if (lowEntropy(message)) {
    return { ok: false, status: 400, error: "Suspicious message content" };
  }

  return { ok: true, data: { name, email, message, website } };
}
