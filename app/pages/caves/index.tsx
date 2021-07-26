import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCaves from "app/caves/queries/getCaves"

const ITEMS_PER_PAGE = 100

export const CavesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ caves, hasMore }] = usePaginatedQuery(getCaves, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {caves.map((cave) => (
          <li key={cave.id}>
            <Link href={Routes.ShowCavePage({ caveId: cave.id })}>
              <a>{cave.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const CavesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Caves</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCavePage()}>
            <a>Create Cave</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CavesList />
        </Suspense>
      </div>
    </>
  )
}

CavesPage.authenticate = true
CavesPage.getLayout = (page) => <Layout>{page}</Layout>

export default CavesPage
