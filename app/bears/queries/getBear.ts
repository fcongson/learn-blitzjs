import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetBear = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetBear), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const bear = await db.bear.findFirst({ where: { id } })

  if (!bear) throw new NotFoundError()

  return {
    ...bear,
    sound: "roar",
  }
})
