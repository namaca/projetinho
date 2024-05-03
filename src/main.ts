import { Client } from "https://deno.land/x/postgres/mod.ts";

Deno.serve({ port: 3000 }, async (req) => {
    console.log(req)
    const client = new Client({
        user: Deno.env.get("DB_USER"),
        database: Deno.env.get("DB_NAME"),
        hostname: Deno.env.get("DB_HOST"),
        port: 5432,
        password: Deno.env.get("DB_PASSWORD"),
    });

    await client.connect();
    
    {

    const result = await client.queryArray("SELECT * FROM alunos");
    console.log(result.rows); // [[1, 'Carlos'], [2, 'John'], ...]
    await client.end();
   
    const html = `
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

    const response = new Response(html, {
        status: 200,
        headers: {
          "content-type": "text/html",
        },
      });
    
      console.log(response.status); // 200
      console.log(response.headers.get("content-type")); // text/html
    
      return response;

    }
    
    
});