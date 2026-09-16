import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json();
    const email = data.email;
    
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400 });
    }

    // Access the KV namespace binding from Cloudflare runtime locals
    // @ts-ignore
    const env = locals.runtime?.env;
    const kv = env?.SUBSCRIBERS;

    if (!kv) {
      console.warn("KV namespace 'SUBSCRIBERS' is not bound. Storing skipped.");
      // We still return success so the frontend works even before they bind it
      return new Response(JSON.stringify({ success: true, warning: "KV not bound" }), { status: 200 });
    }

    // Store the email as the key to prevent duplicates, value is the timestamp
    await kv.put(email, new Date().toISOString());

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Subscription error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
};
