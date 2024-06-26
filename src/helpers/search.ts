import * as booru from "booru/src/index.ts"
import { Context } from "npm:hono"
import ContentType from "./contentType.ts"
import { SearchQuery } from "./types.ts"

/**
 * Searches the booru for an image to return.
 * @param c: Context object from hono
 * @param query: The SearchQuery
 */
export default async function Search(
  c: Context,
  query: SearchQuery,
): Promise<Response> {
  const posts = await booru
    .search(query.site, query.tags, { random: true, limit: 1 })
    .catch((err: Error) => {
      console.error(err)
      return c.json({ error: err.message }, 400)
    })

  const imageURL = (posts as booru.SearchResults)[0]?.fileUrl as string

  const type = imageURL?.split(".")?.pop() 
  if (type == null) {
    return c.json({ error: "No results found" }, 404)
  }
  
  c.header("Content-Type", ContentType(type))
  c.header("Access-Control-Allow-Origin", "*")

  const img = await fetch(imageURL, {
    headers: {
      "User-Agent":
        "waifurudorde/1.0.0 (+https://git.froth.zone/sam/waifurudor.de)",
    },
  })
    // Turn the image into an ArrayBuffer
    .then((fetchRes) => {
      return fetchRes?.arrayBuffer()
    })
    .catch((err: Error) => {
      console.error(err)
      return c.json({ error: err.message }, 500)
    })

  // deepcode ignore XSS: nmp
  return c.body(img as ArrayBuffer)
}
