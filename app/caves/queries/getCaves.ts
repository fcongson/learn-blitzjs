import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCavesInput
  extends Pick<Prisma.CaveFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCavesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: caves,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.cave.count({ where }),
      query: (paginateArgs) => db.cave.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      caves,
      nextPage,
      hasMore,
      count,
    }
  }
)
