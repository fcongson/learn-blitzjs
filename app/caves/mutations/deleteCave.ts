import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteCave = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteCave), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const cave = await db.cave.deleteMany({ where: { id } })

  return cave
})
