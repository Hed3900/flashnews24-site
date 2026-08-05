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

    urls += `
  <url>
    <loc>https://news.flashnews24.site/article/${slug}.html</loc>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8"
    }
  });
}
