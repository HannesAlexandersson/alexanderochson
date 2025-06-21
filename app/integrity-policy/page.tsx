import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import { richTextOptions } from '@/components/RichTextOptions/RichTextOptions'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { GET_INTEGRETY_POLICY } from '@/queries'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { draftMode } from 'next/headers'

const policy = async () => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_INTEGRETY_POLICY,
    variables: {
      preview: isEnabled,
    },
  })

  const policyContent = data?.integretyPolicyCollection?.items

  return (
    <>
      <Menu />
      <main className='section-contain mt-20 min-h-screen max-w-[1024px]'>
        <PageTitle>{policyContent[0].title}</PageTitle>
        {policyContent && (
          <article
            {...ContentfulLivePreview.getProps({
              entryId: policyContent[0]?.sys?.id,
              fieldId: 'policy',
              locale: 'en-US',
            })}
            className='my-16 px-4 md:my-32'
          >
            {documentToReactComponents(
              policyContent[0].policy.json,
              richTextOptions,
            )}
          </article>
        )}
      </main>
    </>
  )
}
export default policy
