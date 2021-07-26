import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCave = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCave), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const cave = await db.cave.findFirst({ where: { id }, include: { bear: true } })

  if (!cave) throw new NotFoundError()

  return cave
})
