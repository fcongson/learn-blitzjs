import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBears from "app/bears/queries/getBears"

const ITEMS_PER_PAGE = 100

export const BearsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ bears, hasMore }] = usePaginatedQuery(getBears, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        {bears.map((bear) => (
          <li key={bear.id} style={{ padding: 0 }}>
            <Link href={Routes.ShowBearPage({ bearId: bear.id })}>
              <a>
                <img
                  src={bear?.image ?? ""}
                  alt={bear.name}
                  style={{ width: 200, height: 200, objectFit: "cover", display: "block" }}
                />
                {bear.name}
              </a>
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

const BearsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Bears</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewBearPage()}>
            <a>Create Bear</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <BearsList />
        </Suspense>
      </div>
    </>
  )
}

BearsPage.authenticate = true
BearsPage.getLayout = (page) => <Layout>{page}</Layout>

export default BearsPage
