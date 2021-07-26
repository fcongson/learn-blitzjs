import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCave = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateCave), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const cave = await db.cave.create({ data: input })

  return cave
})
