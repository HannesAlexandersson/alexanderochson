import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import { richTextOptions } from '@/components/RichTextOptions/RichTextOptions'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { GET_TOS_POLICY } from '@/queries'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { draftMode } from 'next/headers'

const tos = async () => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_TOS_POLICY,
    variables: {
      preview: isEnabled,
    },
  })

  const tosContent = data?.termsOfServiceCollection?.items

  return (
    <>
      <Menu />
      <main className='section-contain mt-20 min-h-screen max-w-[1024px]'>
        <PageTitle>{tosContent[0].title}</PageTitle>
        {tosContent && (
          <article
            {...ContentfulLivePreview.getProps({
              entryId: tosContent?.sys?.id,
              fieldId: 'policy',
              locale: 'en-US',
            })}
            className='my-16 px-4 md:my-32'
          >
            {documentToReactComponents(
              tosContent[0].termsOfService.json,
              richTextOptions,
            )}
          </article>
        )}
      </main>
    </>
  )
}
export default tos
