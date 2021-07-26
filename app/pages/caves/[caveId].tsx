import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCave from "app/caves/queries/getCave"
import deleteCave from "app/caves/mutations/deleteCave"

export const Cave = () => {
  const router = useRouter()
  const caveId = useParam("caveId", "number")
  const [deleteCaveMutation] = useMutation(deleteCave)
  const [cave] = useQuery(getCave, { id: caveId })

  return (
    <>
      <Head>
        <title>Cave {cave.id}</title>
      </Head>

      <div>
        <h1>Cave {cave.id}</h1>
        <pre>{JSON.stringify(cave, null, 2)}</pre>

        <Link href={Routes.EditCavePage({ caveId: cave.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCaveMutation({ id: cave.id })
              router.push(Routes.CavesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCavePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CavesPage()}>
          <a>Caves</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Cave />
      </Suspense>
    </div>
  )
}

ShowCavePage.authenticate = true
ShowCavePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCavePage
