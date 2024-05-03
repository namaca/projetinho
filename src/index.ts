import { Client } from "https://deno.land/x/postgres/mod.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();

console.log(env["DB_USER"])
    const client = new Client({
    user: env["DB_USER"],
    database: env["DB_NAME"],
    hostname: env["DB_HOST"],
    port: 5432,
    password: env["DB_PASSWORD"],
    });
    await client.connect();
  
  {
    const result = await client.queryArray("SELECT * FROM alunos");
    console.log(result.rows); // [[1, 'Carlos'], [2, 'John'], ...]
  }
  
  
  await client.end();