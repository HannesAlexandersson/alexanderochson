import Menu from '@/components/Navbar/Menu'
import Roadmap from '@/components/Roadmap/Roadmap'
import StoryBoard from '@/components/StoryBoard/StoryBoard'
import { StoryBoardProps } from '@/components/StoryBoard/StoryBoard.types'
import { BlockProps } from '@/components/TextSections/TextSection.types'
import TextBlock from '@/components/TextSections/TextSections'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { GET_ABOUT } from '@/queries'
import { DataProps } from '@/utils/globalTypes'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { draftMode } from 'next/headers'
import { BulletProps } from './about.types'

export const metadata = {
  title: 'About',
}

const About = async () => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_ABOUT,
    variables: {
      preview: isEnabled,
    },
  })

  const centerPretext = data?.aboutCenterPreTextCollection?.items[0] || []
  const centerPretextMapping: StoryBoardProps = {
    textsections: {
      sys: centerPretext?.sys,
      sectionSubText: centerPretext?.sectionSubTitle || '',
      sectionHeadText: centerPretext?.sectionTitle || '',
      text: centerPretext?.sectionText?.json || '',
      image: {
        url: centerPretext?.sectionImage.url || {},
        description: centerPretext?.sectionImage.description || '',
        sys: centerPretext?.sectionImage.sys || {},
      },
    },
  }
  const aboutTextSections: DataProps[] =
    data?.aboutTextSectionsCollection?.items || []
  const aboutTextMapping: BlockProps[] = aboutTextSections
    ?.map(block => ({
      sectionTitle: block.sectionTitle,
      sectionText: block.sectionText,
      sectionImage: block.sectionImage,
      sys: block?.sys, // keep sys as ContentfulSys for Contentful Live Preview
      order: block?.order,
    }))
    ?.sort((a, b) => a.order - b.order)

  const roadmapTexts: BulletProps[] = data?.roadmapTextsCollection?.items || []
  return (
    <>
      <Menu withBg={true} />
      <main className='section-contain mt-20'>
        <div className='flex flex-col gap-8 py-12 md:py-20'>
          {centerPretext && (
            <StoryBoard
              textsections={centerPretextMapping.textsections}
              {...ContentfulLivePreview.getProps({
                entryId: centerPretext?.sys?.id,
                fieldId: 'paragraph',
                locale: 'sv-SE',
              })}
            />
          )}
          {aboutTextMapping &&
            aboutTextMapping.map(block => (
              <TextBlock.Section
                id={block.order === 2 ? 'team' : ''}
                key={block.order}
                className={'my-16 md:my-32'}
                reverse={block.order % 2 === 0 ? true : false}
              >
                <TextBlock block={block} showImage={true} />
              </TextBlock.Section>
            ))}
        </div>
      </main>
      {roadmapTexts && <Roadmap bullets={roadmapTexts} />}
    </>
  )
}

export default About
