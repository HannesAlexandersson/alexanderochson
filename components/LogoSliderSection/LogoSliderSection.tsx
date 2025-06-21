import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { gql } from '@apollo/client'
import { draftMode } from 'next/headers'
import CenterTextBlock from '../TextSections/CenterTextSection'
import { LogoSliderSectionProps } from './LogoSlider.types'
import LogoSlider from './LogoSlider/LogoSlider'

const GET_LOGOS = gql`
  query GetData($preview: Boolean) {
    partnerLogoForSliderCollection(limit: 10, preview: $preview) {
      items {
        sys {
          id
        }
        partnerTitle
        partnerLogo {
          url
        }
      }
    }
  }
`

const LogoSliderSection = async ({ preTextData }: LogoSliderSectionProps) => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_LOGOS,
    variables: {
      preview: isEnabled,
    },
  })

  const logoData = data?.partnerLogoForSliderCollection?.items

  return (
    <section className='relative'>
      <CenterTextBlock
        className='my-8 lg:my-10'
        block={preTextData}
        showImage={false}
      />
      <LogoSlider logoData={logoData} className='h-20 [&>*]:select-none' />
    </section>
  )
}

export default LogoSliderSection
