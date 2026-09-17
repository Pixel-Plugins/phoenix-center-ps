const PREPARED_LABEL = /prepared|اعداد|إعداد/i;

// Strips a leading "Prepared by:"/"By"/"اعداد:"/"إعداد:" connector so the
// extracted byline is just the person's name (still keeps honorifics like
// "Dr."/"د." — those are part of how the name is presented, not template
// boilerplate). Found leaking into schema.org Person.name (e.g. "By Mr.
// Nasser Elewa", "اعداد: د. رائد محمد حلس") in the single-line italic case,
// where the whole line — label included — was being captured verbatim.
const LEADING_LABEL = /^(?:prepared\s*(?:by)?|by|اعداد|إعداد)\s*[:：]?\s*/i;

// The live source pages used two different conventions for the trailing
// author credit, both preserved verbatim by the scraper/translator: a
// single italic line ("*Prepared by Dr. X*" / "*اعداد د. ...*"), or a bold
// label paragraph ("**Prepared:**" / "**اعداد:**") followed by a plain
// paragraph with just the name. Pulled out here so it can also surface as
// a compact fact in the hero, without requiring a dedicated author field.
export function extractByline(bodyText: string | undefined | null): string | null {
  if (!bodyText) return null;
  const paragraphs = bodyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const last = paragraphs.at(-1);
  if (!last) return null;

  const italicMatch = /^\*([^*]+)\*$/.exec(last);
  if (italicMatch) return italicMatch[1].trim().replace(LEADING_LABEL, '').trim();

  const secondToLast = paragraphs.at(-2);
  const labelMatch = secondToLast ? /^\*\*([^*]+)\*\*$/.exec(secondToLast) : null;
  if (labelMatch && PREPARED_LABEL.test(labelMatch[1]) && !/[*_]/.test(last)) {
    return last.trim().replace(LEADING_LABEL, '').trim();
  }

  return null;
}
