import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBear from "app/bears/queries/getBear"
import updateBear from "app/bears/mutations/updateBear"
import { BearForm, FORM_ERROR } from "app/bears/components/BearForm"

export const EditBear = () => {
  const router = useRouter()
  const bearId = useParam("bearId", "number")
  const [bear, { setQueryData }] = useQuery(
    getBear,
    { id: bearId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateBearMutation] = useMutation(updateBear)

  return (
    <>
      <Head>
        <title>Edit Bear {bear.id}</title>
      </Head>

      <div>
        <h1>Edit Bear {bear.id}</h1>
        <pre>{JSON.stringify(bear)}</pre>

        <BearForm
          submitText="Update Bear"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateBear}
          initialValues={bear}
          onSubmit={async (values) => {
            try {
              const updated = {
                ...(await updateBearMutation({
                  id: bear.id,
                  ...values,
                })),
                sound: "roar",
              }
              await setQueryData(updated)
              router.push(Routes.ShowBearPage({ bearId: updated.id }))
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

const EditBearPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBear />
      </Suspense>

      <p>
        <Link href={Routes.BearsPage()}>
          <a>Bears</a>
        </Link>
      </p>
    </div>
  )
}

EditBearPage.authenticate = true
EditBearPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBearPage
