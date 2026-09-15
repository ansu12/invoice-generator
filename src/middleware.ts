import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  if (url.pathname === '/googlefd9ca7f0ee134f79.html' || url.pathname === '/googlefd9ca7f0ee134f79' || url.pathname === '/googlefd9ca7f0ee134f79.html/') {
    return new Response('google-site-verification: googlefd9ca7f0ee134f79.html', {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8'
      }
    });
  }
  return next();
});
