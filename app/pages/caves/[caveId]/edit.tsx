import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCave from "app/caves/queries/getCave"
import updateCave from "app/caves/mutations/updateCave"
import { CaveForm, FORM_ERROR } from "app/caves/components/CaveForm"

export const EditCave = () => {
  const router = useRouter()
  const caveId = useParam("caveId", "number")
  const [cave, { setQueryData }] = useQuery(
    getCave,
    { id: caveId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCaveMutation] = useMutation(updateCave)

  return (
    <>
      <Head>
        <title>Edit Cave {cave.id}</title>
      </Head>

      <div>
        <h1>Edit Cave {cave.id}</h1>
        <pre>{JSON.stringify(cave)}</pre>

        <CaveForm
          submitText="Update Cave"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCave}
          initialValues={cave}
          onSubmit={async (values) => {
            try {
              const updated = await updateCaveMutation({
                id: cave.id,
                ...values,
              })
              await setQueryData({ ...updated, bear: null })
              router.push(Routes.ShowCavePage({ caveId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditCavePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCave />
      </Suspense>

      <p>
        <Link href={Routes.CavesPage()}>
          <a>Caves</a>
        </Link>
      </p>
    </div>
  )
}

EditCavePage.authenticate = true
EditCavePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCavePage
