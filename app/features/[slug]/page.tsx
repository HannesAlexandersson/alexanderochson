import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { gql } from '@apollo/client'
import Typography from '@mui/material/Typography'
import { draftMode } from 'next/headers'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  let template = params?.slug?.split('-').join(' ')
  const first = template?.charAt(0)
  template = template?.replace(first, first.toUpperCase())

  return {
    title: `Templates | ${template}`,
  }
}

const GET_TEMPLATE_DATA = gql`
  query GetArticle($slug: String!, $preview: Boolean) {
    currentTemplate: templateCollection(
      where: { slug: $slug }
      limit: 1
      preview: $preview
    ) {
      items {
        __typename
        sys {
          id
        }
        title
        slug
        description
        exampleLink
      }
    }
  }
`

const Template = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_TEMPLATE_DATA,
    variables: {
      slug: params?.slug,
      preview: isEnabled,
    },
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
  })

  const template = data?.designTemplateCollection?.items[0] || null

  // TODO: 1. fixa onclick eventet så user kommer hit OBS måste fixa queryn för att det ska funka. 2. fixa images på korten
  return (
    <>
      <Menu />
      <main className='section-contain min-h-screen pt-20'>
        <PageTitle>{template?.title}</PageTitle>
        <section className='mt-16 mb-8 flex w-full flex-col flex-wrap gap-4 md:mt-32 md:flex-row md:gap-8'>
          <Typography
            variant='h4'
            fontFamily='poppins'
            className='text-center md:text-left'
          >
            {template?.description || ''}
          </Typography>
        </section>
        <section className='w-max-[1200px] my-8 flex flex-col items-center justify-center'>
          <Typography
            variant='body2'
            fontFamily='inria-sherif'
            className='mb-4 text-center'
          >
            I det här fönstret kan du navigera runt i exempel designen hur
            mycket du vill. Och kom ihåg att allt du ser är anpassningsbart!
          </Typography>
        </section>

        <section className='mt-32'>
          <div className='border-wrapperWhite mt-12 rounded-[1.5rem] border-[1px] border-white shadow-[wrapperB2Shadow]'>
            <div className='border-wrapperBlack1 rounded-[1.5rem] border-[1px] border-black'>
              <div className='border-wrapperWhite rounded-[1.5rem] border-[1px] border-white shadow-[wrapperB2Shadow]'>
                <div className='border-wrapperBlack2 rounded-[1.5rem] border-[1px] border-black shadow-[wrapperB2Shadow]'>
                  <div className='bg-default-bg relative m-0 h-[80svh] w-[90svw] overflow-hidden rounded-[22px]'>
                    <div
                      className='external-url-visitor'
                      style={{
                        width: '100%',
                        height: '600px',
                        border: '1px solid #ccc',
                      }}
                    >
                      <iframe
                        src={template?.exampleLink}
                        style={{
                          width: '100%',
                          height: '100%',
                          border: 'none',
                        }}
                        title='Live Example Design'
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Template
