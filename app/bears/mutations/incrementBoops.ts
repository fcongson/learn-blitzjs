import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBear = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(UpdateBear), resolver.authorize(), async ({ id }) => {
  const bear = await db.bear.update({
    where: { id },
    data: {
      boops: { increment: 1 },
    },
  })

  return bear
})
