import { Hono } from "hono/mod.ts"
import { SearchQuery } from "./helpers/types.ts"
import Search from "./helpers/search.ts"

const app = new Hono()

app.onError((err, c) => {
  console.error(err)
  return c.json({ error: err.message }, 500)
})

app.get("/favicon.ico", (c) => c.body(null, 200))

// Politely tell robots to go away
app.get("/robots.txt", (c) => c.text("User-agent: *\nDisallow: /"))

app.all("*", (c) => {
  const query: SearchQuery = {
    site: c.req.query("booru") ?? "safebooru",
    tags: c.req.query("tags") ?? "tohsaka_rin",
  }

  return Search(c, query)
})

Deno.serve(app.fetch)

