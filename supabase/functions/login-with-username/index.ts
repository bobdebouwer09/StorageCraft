import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigin = "https://bobdebouwer09.github.io";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

const jsonResponse = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("Origin");
  if (origin && origin !== allowedOrigin) {
    return jsonResponse({ error: "Origin not allowed." }, 403);
  }
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  let username: string;
  let password: string;
  try {
    const body = await request.json();
    if (typeof body.username !== "string" || typeof body.password !== "string") {
      return jsonResponse({ error: "Gebruikersnaam of wachtwoord is onjuist." }, 400);
    }
    username = body.username.trim().toLowerCase();
    password = body.password;
    if (!/^[a-z0-9_]{3,20}$/.test(username) || password.length < 8 || password.length > 128) {
      return jsonResponse({ error: "Gebruikersnaam of wachtwoord is onjuist." }, 400);
    }
  } catch {
    return jsonResponse({ error: "Ongeldig verzoek." }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !serviceRoleKey || !anonKey) {
    console.error("Username login function is missing Supabase server environment variables.");
    return jsonResponse({ error: "Inloggen is tijdelijk niet beschikbaar." }, 500);
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const authClient = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();
  if (profileError) {
    console.error("Username lookup failed:", profileError.message);
    return jsonResponse({ error: "Inloggen is tijdelijk niet beschikbaar." }, 500);
  }

  let email = "unknown-user@invalid.example";
  if (profile) {
    const { data: authUser, error: userError } = await adminClient.auth.admin.getUserById(profile.id);
    if (userError) {
      console.error("Username account lookup failed:", userError.message);
      return jsonResponse({ error: "Inloggen is tijdelijk niet beschikbaar." }, 500);
    }
    email = authUser.user.email || email;
  }

  const { data, error } = await authClient.auth.signInWithPassword({ email, password });
  if (error || !profile || !data.session) {
    return jsonResponse({ error: "Gebruikersnaam of wachtwoord is onjuist." }, 401);
  }

  return jsonResponse({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  }, 200);
});
