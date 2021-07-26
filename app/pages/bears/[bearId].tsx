import deleteBear from "app/bears/mutations/deleteBear"
import incrementBoops from "app/bears/mutations/incrementBoops"
import getBear from "app/bears/queries/getBear"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const Bear = () => {
  const router = useRouter()
  const bearId = useParam("bearId", "number")
  const [deleteBearMutation] = useMutation(deleteBear)
  const [updateBoopsMutation] = useMutation(incrementBoops)
  const [bear, { refetch }] = useQuery(getBear, { id: bearId })

  const incrementBoop = async () => {
    if (!bearId) {
      return
    }
    await updateBoopsMutation({ id: bearId })
    refetch()
  }

  return (
    <>
      <Head>
        <title>Bear {bear.id}</title>
      </Head>

      <div>
        <h1>Bear {bear.id}</h1>

        <img
          src={bear?.image ?? ""}
          alt={bear.name}
          style={{ width: 200, height: 200, objectFit: "cover", display: "block" }}
        />

        <button onClick={incrementBoop}>Boop this bear! ({bear.boops})</button>
        <pre>{JSON.stringify(bear, null, 2)}</pre>

        <Link href={Routes.EditBearPage({ bearId: bear.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBearMutation({ id: bear.id })
              router.push(Routes.BearsPage())
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

const ShowBearPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.BearsPage()}>
          <a>Bears</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Bear />
      </Suspense>
    </div>
  )
}

ShowBearPage.authenticate = true
ShowBearPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBearPage
