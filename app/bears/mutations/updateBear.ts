import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBear = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string().optional(),
  caveId: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateBear),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const bear = await db.bear.update({ where: { id }, data })

    return bear
  }
)
