export async function onRequest(context) {
  const { request, next } = context;

  const url = new URL(request.url);

  if (!url.pathname.startsWith("/article/")) {
    return next();
  }

  const slug = decodeURIComponent(
    url.pathname.split("/article/")[1]
  ).replace(".html", "");

  const api =
    "https://firestore.googleapis.com/v1/projects/flashnews24-5bfd6/databases/(default)/documents/posts";

  const res = await fetch(api);
  const json = await res.json();

  let post = null;

  for (const doc of (json.documents || [])) {
    const f = doc.fields;

    const firestoreSlug =
      (f.slug?.stringValue || "").replace(".html", "");

    if (firestoreSlug === slug) {
      post = {
        title: f.title?.stringValue || "FlashNews24",
        description: (f.content?.stringValue || "")
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .slice(0, 180),
        image: f.image?.stringValue || "https://news.flashnews24.site/logo.png",
      };
      break;
    }
  }

  if (!post) {
    return next();
  }

  return new Response(
`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">

<title>${escape(post.title)}</title>

<meta name="description" content="${escape(post.description)}">

<meta property="og:type" content="article">
<meta property="og:title" content="${escape(post.title)}">
<meta property="og:description" content="${escape(post.description)}">
<meta property="og:image" content="${post.image}">
<meta property="og:url" content="${request.url}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(post.title)}">
<meta name="twitter:description" content="${escape(post.description)}">
<meta name="twitter:image" content="${post.image}">

<script>
window.location.replace("${request.url}");
</script>

</head>
<body>
Redirecting...
</body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    }
  );
}

function escape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
