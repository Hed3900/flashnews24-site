export async function onRequest(context) {
  const { request, params, next } = context;

  const slug = decodeURIComponent(params.slug).replace(".html", "");

  const api =
    "https://firestore.googleapis.com/v1/projects/flashnews24-5bfd6/databases/(default)/documents/posts";

  const res = await fetch(api);
  const json = await res.json();

  let post = null;

  for (const doc of json.documents || []) {
    const f = doc.fields || {};

    const firestoreSlug =
      (f.slug?.stringValue || "").replace(".html", "");

    if (firestoreSlug === slug) {
      post = {
        title: f.title?.stringValue || "FlashNews24",
        description: (f.content?.stringValue || "")
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .slice(0, 180),
        image:
          f.image?.stringValue ||
          "https://news.flashnews24.site/logo.png",
      };
      break;
    }
  }
const response = await next();

return new Response(
  JSON.stringify({
    status: response.status,
    contentType: response.headers.get("content-type")
  }),
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
);
if (!post) {
  return response;
}
console.log("Slug:", slug);
console.log("Status:", response.status);
console.log("Content-Type:", response.headers.get("content-type"));

if (!response.headers.get("content-type")?.includes("text/html")) {
  return response;
}

  return new HTMLRewriter()
    .on(
      "head",
      new HeadRewriter(
        post.title,
        post.description,
        post.image,
        request.url
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
<meta name="test-worker" content="worker-ok">
<meta name="test-time" content="${Date.now()}">

<meta property="og:type" content="article">
<meta property="og:title" content="${escapeHtml(this.title)}">
<meta property="og:description" content="${escapeHtml(this.description)}">
<meta property="og:image" content="${this.image}">
<meta property="og:url" content="${this.url}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(this.title)}">
<meta name="twitter:description" content="${escapeHtml(this.description)}">
<meta name="twitter:image" content="${this.image}">
`,
    { html: true }
  );
  }
}

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
