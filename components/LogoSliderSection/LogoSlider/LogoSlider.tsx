import { cn } from '@/utils/utils'
import { ContentfulLivePreview } from '@contentful/live-preview'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export type LogoSliderProps = {
  logoData: {
    sys: {
      id: string
      __typename: string
    }
    __typename: string
    partnerTitle: string
    partnerLogo: {
      __typename: string
      url: string
    }
  }[]
  className?: string
}

const LogoSlider = ({ logoData, className, ...props }: LogoSliderProps) => {
  return (
    <section className='relative'>
      <div className='absolute inset-0 z-10 h-full w-10 bg-gradient-to-r from-white md:w-14' />
      <Marquee
        autoFill
        play
        speed={20}
        className={cn('h-20 [&>*]:select-none', className)}
        {...props}
      >
        {logoData.map(logo => (
          <div
            className='grid aspect-square h-20 w-20 place-content-center p-2'
            key={logo.partnerLogo.url}
          >
            <Image
              className='aspect-square object-contain object-center grayscale'
              src={logo.partnerLogo.url}
              alt={logo.partnerTitle ?? 'Partner Logo'}
              width={80}
              height={80}
              {...ContentfulLivePreview.getProps({
                assetId: logo?.sys?.id ?? '',
                fieldId: 'logos',
                locale: 'en-US',
              })}
            />
          </div>
        ))}
      </Marquee>
      <div className='absolute top-0 right-0 z-10 h-full w-10 bg-gradient-to-l from-white md:w-14' />
    </section>
  )
}

export default LogoSlider
