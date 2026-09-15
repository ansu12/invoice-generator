import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  return new Response('google-site-verification: googlefd9ca7f0ee134f79.html', {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8'
    }
  });
};
