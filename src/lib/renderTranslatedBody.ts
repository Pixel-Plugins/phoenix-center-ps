function escapeHtml(text: string) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

// Minimal bold/italic inline markup, matching the same lightweight
// convention used in the native (scraped) Markdown bodies — enough for
// the section-label/byline paragraph styling in [slug].astro to still
// key off <strong>/<em> being the paragraph's only content.
function renderInline(text: string) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

/** Renders a translated body string (plain paragraphs separated by blank
 *  lines, stored in the `bodyEn` frontmatter field) to the same paragraph
 *  HTML shape Astro's Markdown renderer produces for the native body. */
export function renderTranslatedBody(bodyEn: string): string {
  return bodyEn
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${renderInline(p)}</p>`)
    .join('\n');
}
