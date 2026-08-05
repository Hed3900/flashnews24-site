export async function onRequest(context) {
  const { request, params, next } = context;

  const slug = decodeURIComponent(params.slug).replace(".html", "");

  const api =
    "https://firestore.googleapis.com/v1/projects/flashnews24-5bfd6/databases/(default)/documents/posts";

  let post = null;

  try {
    const res = await fetch(api);

    if (!res.ok) {
      return next();
    }

    const json = await res.json();

    for (const doc of (json.documents || [])) {
      const f = doc.fields || {};

      const firestoreSlug =
        (f.slug?.stringValue || "").replace(".html", "");

      if (firestoreSlug === slug) {
        post = {
          title:
            f.title?.stringValue || "FlashNews24",

          description:
            (f.content?.stringValue || "")
              .replace(/<[^>]+>/g, "")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 180),

          image:
            f.image?.stringValue ||
            "https://news.flashnews24.site/logo.png",

          url: request.url,
        };

        break;
      }
    }
  } catch (err) {
    console.log(err);
    return next();
  }

  const response = await next();

  if (!post) {
    return response;
  }

  return new HTMLRewriter()
    .on(
      "head",
      new HeadRewriter(
        post.title,
        post.description,
        post.image,
        post.url
      )
    )
    .transform(response);
}
class HeadRewriter {
  constructor(title, description, image, url) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.url = url;
  }

  element(head) {
    head.append(
      `
<title>${escapeHtml(this.title)} | FlashNews24</title>

<meta name="description" content="${escapeHtml(this.description)}">

<link rel="canonical" href="${this.url}">

<meta property="og:type" content="article">
<meta property="og:site_name" content="FlashNews24">
<meta property="og:title" content="${escapeHtml(this.title)}">
<meta property="og:description" content="${escapeHtml(this.description)}">
<meta property="og:image" content="${this.image}">
<meta property="og:url" content="${this.url}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(this.title)}">
<meta name="twitter:description" content="${escapeHtml(this.description)}">
<meta name="twitter:image" content="${this.image}">

<meta name="robots" content="index,follow">

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"NewsArticle",
  "headline":"${escapeHtml(this.title)}",
  "image":["${this.image}"],
  "mainEntityOfPage":"${this.url}"
}
</script>
`,
      { html: true }
    );
  }
}
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
