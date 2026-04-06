import fs from "fs";

const TITLE_WORDS = 4; // words from title after prefix+year

// Stop words to skip when picking representative title words
const STOP = new Set([
  "a", "an", "the", "of", "in", "on", "for", "to", "and", "or",
  "with", "by", "at", "from", "is", "are", "its", "using", "based",
]);

function englishWords(title) {
  return title
    .replace(/['\u2018\u2019\u201c\u201d\u2013\u2014]/g, " ")
    .split(/[\s:;,/()[\]\u3000?!.]+/)
    .map((w) => w.trim())
    .filter((w) => w && /[a-zA-Z]/.test(w)) // English-only tokens
    .map((w) =>
      w
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "")
    )
    .filter(Boolean);
}

function titleSlug(title, limit) {
  const all = englishWords(title);
  // Prefer non-stop words; fall back to all words if needed
  const meaningful = all.filter((w) => !STOP.has(w));
  const chosen = meaningful.length >= limit ? meaningful : all;
  return chosen.slice(0, limit).join("-");
}

function reorderWithSlugFirst(item, slug) {
  const out = { id: item.id, slug };
  for (const k of Object.keys(item)) {
    if (k !== "id" && k !== "slug") out[k] = item[k];
  }
  return out;
}

function processFile(fileUrl, prefix) {
  const filePath = decodeURIComponent(fileUrl.pathname).replace(/^\/([A-Za-z]:)/, "$1").replace(/\//g, "\\");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const seen = Object.create(null);

  const out = data.map((item) => {
    const year = String(item.date || "").slice(0, 4);
    const base = titleSlug(item.title || "", TITLE_WORDS);
    const prefixYear = `${prefix}${year}`;

    const idCompactFallback = String(item.id).replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);
    let slug = base
      ? `${prefixYear}-${base}`
      : idCompactFallback
        ? `${prefixYear}-${idCompactFallback}`
        : prefixYear;

    if (seen[slug]) {
      // Try shorter title portions before appending id
      let resolved = false;
      const idCompact = String(item.id).replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);
      for (let w = TITLE_WORDS - 1; w >= 1; w--) {
        const shorter = titleSlug(item.title || "", w);
        const candidate = shorter
          ? `${prefixYear}-${shorter}-${idCompact}`
          : idCompact
            ? `${prefixYear}-${idCompact}`
            : `${prefixYear}`;
        if (!seen[candidate]) {
          slug = candidate;
          resolved = true;
          break;
        }
      }
      if (!resolved) {
        let n = 2;
        slug = `${prefixYear}-${idCompact}`;
        while (seen[slug]) { slug = `${prefixYear}-${idCompact}-${n++}`; }
      }
    }

    seen[slug] = true;
    const { slug: _drop, ...rest } = item;
    return reorderWithSlugFirst(rest, slug);
  });

  fs.writeFileSync(filePath, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`${filePath.split(/[/\\]/).pop()}  (${out.length} items)`);
}

const root = new URL("../public/data/", import.meta.url);
processFile(new URL("publicationsData.json", root), "pub");
processFile(new URL("internationalData.json", root), "intl");
processFile(new URL("nationalData.json", root), "nat");

console.log("done");
