export async function onRequest() {
  const api =
    "https://firestore.googleapis.com/v1/projects/flashnews24-5bfd6/databases/(default)/documents/posts";

  const res = await fetch(api);
  const json = await res.json();

  let urls = "";

  for (const doc of (json.documents || [])) {
    const f = doc.fields || {};

    const slug = (f.slug?.stringValue || "").replace(".html", "");
    if (!slug) continue;

    const title = (f.title?.stringValue || "").replace(/&/g, "&amp;");

    const published =
      f.createdAt?.timestampValue ||
      f.publishedAt?.timestampValue ||
      new Date().toISOString();

    urls += `
<url>
  <loc>https://news.flashnews24.site/article/${slug}.html</loc>

  <news:news>
    <news:publication>
      <news:name>FlashNews24</news:name>
      <news:language>en</news:language>
    </news:publication>

    <news:publication_date>${published}</news:publication_date>
    <news:title>${title}</news:title>

  </news:news>
</url>`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8"
    }
  });
}
