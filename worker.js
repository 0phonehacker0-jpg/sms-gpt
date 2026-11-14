export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://0phonehacker0-jpg.github.io",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    try {
      if (url.pathname === "/api/health") {
        const result = await env.DB
          .prepare("SELECT COUNT(*) AS total FROM users")
          .first();

        return Response.json({
          status: "ok",
          database: "connected",
          users: result.total
        }, { headers: corsHeaders });
      }

      return Response.json({
        error: "مسیر موردنظر پیدا نشد"
      }, {
        status: 404,
        headers: corsHeaders
      });

    } catch (error) {
      return Response.json({
        status: "error",
        message: "خطا در اتصال به دیتابیس"
      }, {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};
