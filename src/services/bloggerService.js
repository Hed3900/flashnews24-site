const API_KEY = "AIzaSyBX5-m0a9hbjZr3Ni31SayRN2tifGOMTNw";

const BLOG_ID = "2160464596365043771";

export async function getPosts() {
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`
  );

  const data = await res.json();
  return data.items || [];
}

export async function getPost(postId) {
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${postId}?key=${API_KEY}`
  );

  return await res.json();
}
