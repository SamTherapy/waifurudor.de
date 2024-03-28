import { Hono } from "npm:hono"
import { logger } from "npm:hono/logger"
import { compress } from "npm:hono/compress"
import { secureHeaders } from "npm:hono/secure-headers"
import { SearchQuery } from "./helpers/types.ts"
import Search from "./helpers/search.ts"

const app = new Hono()

export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest)
}

app.use("*", secureHeaders())
app.use("*", logger(customLogger))
app.use("*", compress())

app.onError((err, c) => {
  console.error(err)
  return c.json({ error: err.message }, 500)
})

app.get("/favicon.ico", (c) => c.body(null, 204))

// Politely tell robots to go away
app.get("/robots.txt", (c) => c.text("User-agent: *\nDisallow: /"))

app.all("/", (c) => {
  const query: SearchQuery = {
    site: c.req.query("booru") ?? "safebooru",
    tags: c.req.query("tags")?.split(",") ??
      (c.req.header("Host") === "rint.osaka" ? "tohsaka_rin" : ""),
  }

  return Search(c, query)
})

Deno.serve(app.fetch)
