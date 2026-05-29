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

// Known disposable / spam-only email domains. Env var adds extras.
const HARDCODED_BLOCKED_DOMAINS = new Set([
  "jmail.com",
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamailblock.com",
  "10minutemail.com",
  "throwam.com",
  "trashmail.com",
  "yopmail.com",
  "sharklasers.com",
  "grr.la",
  "spam4.me",
  "maildrop.cc",
  "dispostable.com",
  "discard.email",
  "tempmail.com",
  "temp-mail.org",
  "fakeinbox.com",
  "mailnull.com",
  "spamgourmet.com",
  "getairmail.com",
  "filzmail.com",
  "throwam.com",
]);

const ENV_BLOCKED_DOMAINS = new Set(
  (process.env.BLOCKED_EMAIL_DOMAINS ?? "")
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean)
);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isBlockedDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return HARDCODED_BLOCKED_DOMAINS.has(domain) || ENV_BLOCKED_DOMAINS.has(domain);
}

function lowEntropy(value: string): boolean {
  const uniqueChars = new Set(value).size;
  return uniqueChars < 4;
}

// Patterns commonly used in prompt injection attacks.
const PROMPT_INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(previous|all|prior|the\s+above)\s+(instructions?|commands?|rules?|prompts?)/i,
  /disregard\s+(previous|all|prior|the\s+above)/i,
  /forget\s+(your\s+)?(previous\s+)?(instructions?|rules?|guidelines?|training)/i,
  /you\s+are\s+now\s+(an?\s+)?(ai|assistant|bot|gpt|claude|llm)/i,
  /act\s+as\s+(an?\s+)?(ai|assistant|bot|gpt|claude|llm|different|new)/i,
  /new\s+(role|persona|instructions?)\s*:/i,
  /^\s*system\s*:/im,
  /^\s*<\s*system\s*>/im,
  /from\s+now\s+on\s+(you|act|be|respond)/i,
  /pretend\s+(you\s+are|to\s+be)\s+(an?\s+)?(ai|assistant|bot|gpt|claude)/i,
  /jailbreak/i,
  /DAN\b/,
];

function containsPromptInjection(value: string): boolean {
  return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(value));
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

  // Honeypot: must be empty
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

  if (isBlockedDomain(email)) {
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

  // Prompt injection attempt
  if (containsPromptInjection(name) || containsPromptInjection(message)) {
    return { ok: false, status: 400, error: "Suspicious content detected" };
  }

  return { ok: true, data: { name, email, message, website } };
}
