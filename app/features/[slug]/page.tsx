import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import Typography from '@/components/Typography/Typography'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { gql } from '@apollo/client'
import { draftMode } from 'next/headers'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params

  let template = slug?.split('-').join(' ')
  const first = template?.charAt(0)
  template = template?.replace(first, first.toUpperCase())

  return {
    title: `Templates | ${template}`,
  }
}

const GET_TEMPLATE_DATA = gql`
  query GetArticle($slug: String!, $preview: Boolean) {
    currentTemplate: designTemplatesCollection(
      where: { slug: $slug }
      limit: 1
      preview: $preview
    ) {
      items {
        __typename
        sys {
          id
        }
        designTitle
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
  const { slug } = await params

  const { data } = await client.query({
    query: GET_TEMPLATE_DATA,
    variables: {
      slug: slug,
      preview: isEnabled,
    },
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
  })

  const template = data?.currentTemplate?.items[0] || null

  return (
    <>
      <Menu />
      <main className='section-contain min-h-screen pt-20'>
        <PageTitle>{template?.designTitle}</PageTitle>
        <section className='mt-8 mb-8 flex w-full flex-col flex-wrap gap-4 md:mt-12 md:flex-row md:gap-8'>
          <Typography
            variant='p'
            fontFamily='poppins'
            className='text-center md:text-left'
          >
            {template?.description || ''}
          </Typography>
        </section>
        <section className='w-max-[1200px] mt-8 flex flex-col items-center justify-center'>
          <Typography
            variant='p'
            fontFamily='inria-sherif'
            className='text-center'
          >
            I det här fönstret kan du navigera runt i exempel designen hur
            mycket du vill. Och kom ihåg att allt du ser är anpassningsbart!
          </Typography>
        </section>

        <section className='mt-4 mb-20'>
          <div className='border-wrapperWhite rounded-[1.5rem] border-[1px] border-white shadow-[wrapperB2Shadow]'>
            <div className='border-wrapperBlack1 rounded-[1.5rem] border-[2px] border-black'>
              <div className='border-wrapperWhite rounded-[1.5rem] border-[1px] border-white shadow-[wrapperB2Shadow]'>
                <div className='border-wrapperBlack2 rounded-[1.5rem] border-[1px] border-black shadow-[wrapperB2Shadow]'>
                  <div className='bg-default-bg relative m-0 h-[80svh] overflow-hidden rounded-[22px]'>
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
