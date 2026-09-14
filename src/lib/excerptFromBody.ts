// None of the 51 publications have a frontmatter `excerpt`, so the meta
// description is derived from the actual body text instead: skip a
// label-only lead paragraph (e.g. "**Study Summary**" / "**ملخص الدراسة**"),
// strip markdown emphasis, and truncate at a word boundary.
const LABEL_ONLY_PARAGRAPH = /^(\*{1,2}[^*]+\*{1,2}|.{1,40}:)$/;

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/[_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerptFromBody(bodyText: string | undefined | null, maxLength = 160): string | null {
  if (!bodyText) return null;
  const paragraphs = bodyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return null;

  const content = paragraphs.find((p) => !LABEL_ONLY_PARAGRAPH.test(p)) ?? paragraphs[0];
  const clean = stripMarkdown(content);
  if (clean.length <= maxLength) return clean;

  const truncated = clean.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}
