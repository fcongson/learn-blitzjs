import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createBear from "app/bears/mutations/createBear"
import { BearForm, FORM_ERROR } from "app/bears/components/BearForm"

const NewBearPage: BlitzPage = () => {
  const router = useRouter()
  const [createBearMutation] = useMutation(createBear)

  return (
    <div>
      <h1>Create New Bear</h1>

      <BearForm
        submitText="Create Bear"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateBear}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const bear = await createBearMutation(values)
            router.push(Routes.ShowBearPage({ bearId: bear.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.BearsPage()}>
          <a>Bears</a>
        </Link>
      </p>
    </div>
  )
}

NewBearPage.authenticate = true
NewBearPage.getLayout = (page) => <Layout title={"Create New Bear"}>{page}</Layout>

export default NewBearPage
