import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCave from "app/caves/mutations/createCave"
import { CaveForm, FORM_ERROR } from "app/caves/components/CaveForm"

const NewCavePage: BlitzPage = () => {
  const router = useRouter()
  const [createCaveMutation] = useMutation(createCave)

  return (
    <div>
      <h1>Create New Cave</h1>

      <CaveForm
        submitText="Create Cave"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCave}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const cave = await createCaveMutation(values)
            router.push(Routes.ShowCavePage({ caveId: cave.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CavesPage()}>
          <a>Caves</a>
        </Link>
      </p>
    </div>
  )
}

NewCavePage.authenticate = true
NewCavePage.getLayout = (page) => <Layout title={"Create New Cave"}>{page}</Layout>

export default NewCavePage
