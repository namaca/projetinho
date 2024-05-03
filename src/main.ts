import { Client } from "https://deno.land/x/postgres/mod.ts";

Deno.serve({ port: 3000 }, async () => {

    let result = {};
    const client = new Client({
        user: Deno.env.get("DB_USER"),
        database: Deno.env.get("DB_NAME"),
        hostname: Deno.env.get("DB_HOST"),
        port: 5432,
        password: Deno.env.get("DB_PASSWORD"),
    });

    await client.connect();
    
    {
    result = await client.queryArray("SELECT * FROM alunos");
    console.log(result.rows); // [[1, 'Carlos'], [2, 'John'], ...]
    }

    await client.end();

    return result
    
});