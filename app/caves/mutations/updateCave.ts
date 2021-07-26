import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCave = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateCave),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cave = await db.cave.update({ where: { id }, data })

    return cave
  }
)
