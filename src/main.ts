import { Client } from "https://deno.land/x/postgres/mod.ts";

Deno.serve({ port: 3000 }, async (req) => {
    console.log(req.headers.get('host'))

    // Verifique o caminho do URL da solicitação
    const url = new URL(req.url, `http://${req.headers.get('host')}/`);
    const path = url.pathname;

    const client = new Client({
        user: Deno.env.get("DB_USER"),
        database: Deno.env.get("DB_NAME"),
        hostname: Deno.env.get("DB_HOST"),
        port: 5432,
        password: Deno.env.get("DB_PASSWORD"),
    });

    await client.connect();
    
    let html = "";

    // Verifique o caminho do URL e responda de acordo
    if (path === "/alunos") {
        const result = await client.queryArray("SELECT * FROM alunos");
        console.log(result.rows); // [[1, 'Carlos'], [2, 'John'], ...]

        html = `
        <html>
            <head>
                <title>Alunos</title>
            </head>
            <body>
                <h1>Alunos</h1>
                <ul>
                    ${result.rows.map((row) => `<li>${row[1]}</li>`).join("")}
                </ul>
            </body>
        </html>
        `;
    } else {
        // Se o caminho do URL não corresponder a "/alunos", responda com uma mensagem de erro ou outra coisa
        html = "<html><head><title>Erro 404</title></head><body><h1>Erro 404 - Página não encontrada</h1></body></html>";
    }

    await client.end();
    
    const response = new Response(html, {
        status: 200,
        headers: {
            "content-type": "text/html; charset=utf-8",
        },
    });

    console.log(response.status); // 200
    console.log(response.headers.get("content-type")); // text/html

    return response;
});
