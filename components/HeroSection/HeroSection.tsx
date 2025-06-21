import Button from '@/components/Button/Button'
import Divider from '@/components/Divider/Divider'
import Typography from '@/components/Typography/Typography'
import Image from 'next/image'
import Link from 'next/link'
//import { ContentfulLivePreview } from '@contentful/live-preview'
import { HeroProps } from './HeroSection.types'

const Herosection = (data: HeroProps) => {
  const { heroTitle, heroText, heroImage, heroCtaPrimary, heroCtaSecondary } =
    data

  return (
    <section className='bg-primaryBg relative h-screen'>
      <div className='absolute inset-0 flex items-center justify-center px-8'>
        <Image
          src={heroImage.url}
          alt={heroTitle}
          width={300}
          height={300}
          className='z-5 object-center'
          priority
        />
      </div>
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <Typography
          variant='h1'
          className='text-primaryText font-poppins mb-4 text-3xl font-normal md:text-4xl lg:text-[64px]'
        >
          {heroTitle}
        </Typography>
        <div className='mt-0 mb-6 max-w-2xl text-center'>
          <Divider variant='gradient' />
        </div>
        {heroText.json.content.map((item, index: number) => (
          <Typography
            key={index}
            variant='p'
            className='text-secondaryText font-inria-sherif mb-8 text-center text-lg font-normal text-wrap lg:text-[24px] lg:tracking-[1%] xl:text-[32px] xl:tracking-[2%]'
          >
            {item.content[0].value}
          </Typography>
        ))}
        <div className='z-15 mt-20 flex flex-col justify-center gap-4 bg-none lg:mt-18 lg:flex-row'>
          <Link href='/contact'>
            <Button variant='primary' className='w-45'>
              {heroCtaPrimary}
            </Button>
          </Link>
          <Link href='/about'>
            <Button variant='secondary' className='w-45'>
              {heroCtaSecondary}
            </Button>
          </Link>
        </div>
      </div>
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
    </section>
  )
}

export default Herosection
