export async function onRequest(context) {
  const { request, next } = context;

  const ua = request.headers.get("user-agent") || "";

  //const isBot =
  //  /facebookexternalhit|Facebot|WhatsApp|Twitterbot|TelegramBot|LinkedInBot|Slackbot/i.test(
   //   ua
  //  );

 // if (!isBot) {
 //   return next();
 // }

  const url = new URL(request.url);
  const path = url.pathname;

  if (!path.startsWith("/article/")) {
    return next();
  }

  const slug = path.split("/article/")[1].replace(".html", "");

  const api =
  "https://firestore.googleapis.com/v1/projects/flashnews24-5bfd6/databases/(default)/documents/posts";
  const res = await fetch(api);
  const json = await res.json();

  let post = null;

  for (const doc of json.documents || []) {
    const f = doc.fields;

    if (f.slug?.stringValue === slug) {
      post = {
        title: f.title?.stringValue || "",
        image: f.image?.stringValue || "",
        content: f.content?.stringValue || "",
      };
      break;
    }
  }

  if (!post) {
    return next();
  }

  const response = await next();
console.log("Worker executed:", request.url);
  return new HTMLRewriter()
    .on(
      "head",
      new HeadRewriter(
        post.title,
        post.content,
        post.image,
        request.url
      )
    )
    .transform(response);
}

class HeadRewriter {
  constructor(title, content, image, url) {
    this.title = title;
    this.content = content.replace(/<[^>]*>/g, "").slice(0, 180);
    this.image = image;
    this.url = url;
  }

  element(element) {
    element.append(`
<meta name="test-worker" content="worker-ok">

<meta property="og:type" content="article">
<meta property="og:title" content="${this.title}">
<meta property="og:description" content="${this.content}">
<meta property="og:image" content="${this.image}">
<meta property="og:url" content="${this.url}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${this.title}">
<meta name="twitter:description" content="${this.content}">
<meta name="twitter:image" content="${this.image}">
`, {
  html: true,
});
  }
}
