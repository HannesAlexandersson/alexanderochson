import Button from '@/components/Button/Button'
import CardSlider from '@/components/CardSlider/CardSlider'
import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import CenterTextBlock from '@/components/TextSections/CenterTextSection'
import { BlockProps } from '@/components/TextSections/TextSection.types'
import TextBlock from '@/components/TextSections/TextSections'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { GET_FEATURES } from '@/queries'
import { CardSliderData, DataProps } from '@/utils/globalTypes'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Features',
  description: `Våra tjänster och erbjudanden`,
}

const Features = async () => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_FEATURES,
    variables: {
      preview: isEnabled,
    },
  })

  const featuresData: DataProps[] = data?.featureTextSectionsCollection?.items
  const mappedFeaturesData: BlockProps[] = featuresData
    ?.map(section => ({
      sectionTitle: section.sectionTitle,
      sectionText: section.sectionText,
      sectionImage: section.sectionImage,
      order: section.order, // keep the order for layout purposes
      sys: section.sys, // keep sys for Contentful Live Preview
    }))
    ?.sort((a, b) => a.order - b.order)

  const centreTextData = data?.featureCentreTextCollection?.items || []
  const centreTextMapped: BlockProps = {
    sectionTitle: centreTextData[0].title,
    sectionText: centreTextData[0].textSection,
    sys: centreTextData[0].sys, // keep sys for Contentful Live Preview
    order: 0, // default order for center text
  }

  const queryCardData: CardSliderData[] =
    data?.featureCardsCollection?.items || []
  const cardData = queryCardData
    .map(card => ({
      cardTitle: card.cardTitle,
      cardText: card.cardText,
      nameOfIcon: card.nameOfIcon,
      order: card.order,
      sys: card.sys, // keep sys for Contentful Live Preview
      price: card.price,
      nameOfIconColor: card.nameOfIconColor,
    }))
    .sort((a, b) => a.order - b.order)

  return (
    <>
      <Menu withBg={false} />
      <main className='mx-auto mt-20 max-w-[1440px] px-6'>
        <PageTitle>Våra tjänster</PageTitle>
        <div className='flex flex-col py-6 md:py-12'>
          {mappedFeaturesData &&
            mappedFeaturesData.map(block => (
              <TextBlock.Section
                key={block.sys?.id ?? block.order}
                className={'my-12'}
                reverse={block.order % 2 === 0 ? true : false}
              >
                <TextBlock block={block} showImage={true} />
              </TextBlock.Section>
            ))}
        </div>
      </main>
      <div className='bg-primaryBg relative mb-10 flex flex-col py-18 md:mb-20 md:py-24 lg:py-32'>
        <div className='absolute top-0 z-10 w-full overflow-hidden'>
          <Image
            src='/images/wave.png'
            alt='Background Image'
            width={1400}
            height={100}
            className='z-99 w-full translate-y-[-10px] rotate-180'
            priority
          />
        </div>
        {centreTextMapped && (
          <>
            <CenterTextBlock
              className='my-8 px-10 md:px-20'
              block={centreTextMapped}
              showImage={false}
              {...ContentfulLivePreview.getProps({
                entryId:
                  data?.frontPageTextSectionsCollection?.items[0]?.sys?.id,
                fieldId: 'paragraph',
                locale: 'sv-SE',
              })}
            />
            <div className='flex items-center justify-center'>
              <Button variant='primary' size='sm' className='rounded-lg'>
                <Link href='/contact'>Boka nu</Link>
              </Button>
            </div>
          </>
        )}
        {cardData && <CardSlider cardData={cardData} />}
        <div className='absolute bottom-0 z-10 w-full overflow-hidden'>
          <Image
            src='/images/wave.png'
            alt='Background Image'
            width={1400}
            height={100}
            className='z-99 w-full'
            priority
          />
        </div>
      </div>
    </>
  )
}
export default Features
