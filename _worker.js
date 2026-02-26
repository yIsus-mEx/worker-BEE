export default {
  async fetch(request, env) {
    const userAgent = request.headers.get("user-agent") || "";
    const secFetchMode = request.headers.get("sec-fetch-mode") || "";
    const url = new URL(request.url);

    // 1. BLOQUEO A NAVEGADORES
    if (secFetchMode === "navigate" && (userAgent.includes("Mozilla") || userAgent.includes("Chrome"))) {
      return new Response("Aqui No Veras Nada : Solo disponible desde la App.", { status: 403 });
    }

    // 2. RUTA /update
    if (url.pathname === "/update") {
      
      // Tu URL real de GitHub (oculta)
      const GITHUB_URL = "https://raw.githubusercontent.com/yIsus-mEx/AF1CIONADOS/main/af1cionados.w3u";

      try {
        // Hacemos la petición a GitHub de forma invisible para el usuario
        const res = await fetch(GITHUB_URL);
        
        if (!res.ok) return new Response("Error al conectar con GitHub", { status: 500 });
        
        const texto = await res.text();

        return new Response(texto, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "access-control-allow-origin": "*",
          },
        });
      } catch (e) {
        return new Response("Error interno", { status: 500 });
      }
    }

    return new Response("No encontrado", { status: 404 });
  }
};
