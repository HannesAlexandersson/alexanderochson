'use client'
import Typography from '@/components/Typography/Typography'
import { cn } from '@/utils/utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import BackgroundCanvas from '../BackgroundCanvas/BackgroundCanvas'
import {
  FooterProps,
  SectionContentProps,
  SectionProps,
  SectionTitleProps,
  SocialMediaSection,
  TextSection,
} from './Footer.types'

const FooterModel = dynamic(() => import('@/components/Model/ModelCanvas'), {
  ssr: false,
})

const Section = ({ children, ...props }: SectionProps) => {
  return (
    <section {...props} className='flex flex-col md:min-w-40 md:gap-3'>
      {children}
    </section>
  )
}

const Title = ({ children, ...props }: SectionTitleProps) => {
  return (
    <Typography
      variant={'h4'}
      className={'text-primaryText text-3xl font-semibold md:text-xl'}
      {...props}
    >
      {children}
    </Typography>
  )
}

Section.Title = Title

const Content = ({ children, className, ...props }: SectionContentProps) => {
  return (
    <div className={cn('flex flex-col md:gap-2', className)} {...props}>
      {children}
    </div>
  )
}

Section.Content = Content

const Footer = ({ footerData, ...props }: FooterProps) => {
  const footerLogo = footerData.logo[0]?.footerLogo?.url || ''
  const footerBackgroundText = footerData.backgroundText || ''

  return (
    <footer {...props} className='bg-primaryBg text-primaryText'>
      {/* Main footer content */}
      <div className='py-12 pl-12 md:px-8 lg:px-10'>
        <div className='relative mx-auto flex max-w-[1200px] flex-col justify-between gap-4 overflow-hidden md:flex-row md:items-start md:gap-0 md:overflow-visible'>
          {/* columns */}
          {footerData.sections.map((section: TextSection, index: number) => (
            <Section key={index}>
              <Section.Title className='text-primaryText font-poppins underline sm:mt-2'>
                {section.sectionTitle}
              </Section.Title>
              <Section.Content>
                {section.linkTexts.map((linkText, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={`/${linkText.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Typography
                      size='sm'
                      className='text-secondaryText font-inria-sherif text-lg transition-colors hover:text-slate-900 hover:underline'
                    >
                      {linkText}
                    </Typography>
                  </Link>
                ))}
              </Section.Content>
            </Section>
          ))}

          {/* Sociala medier */}

          <Section className='flex flex-col'>
            <Section.Title className='text-primaryText font-poppins underline sm:mt-2'>
              Sociala medier
            </Section.Title>
            {footerData.socialMedia.map(
              (section: SocialMediaSection, index: number) => (
                <Section.Content
                  key={index}
                  className='flex items-start md:gap-4'
                >
                  <a
                    href={section.linkToSocialmedia}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-secondaryText flex items-center gap-2 transition-colors hover:text-slate-900 hover:underline'
                  >
                    <Image
                      src={section.socialMediaIcon.url}
                      alt={section.socialMediaTitle}
                      width={24}
                      height={24}
                      className='h-6 w-6'
                    />
                    <Typography
                      size='sm'
                      className='text-secondaryText font-inria-sherif text-lg transition-colors hover:text-slate-900 hover:underline'
                    >
                      {section.socialMediaTitle}
                    </Typography>
                  </a>
                </Section.Content>
              ),
            )}
          </Section>
          <Image
            src={footerLogo}
            alt='Logo'
            width={1000}
            height={1000}
            className='absolute right-0 z-10 translate-x-1/2 md:hidden'
          />
        </div>
      </div>

      {/* Partner logos section */}
      <div className='border-t border-gray-800 px-6 py-8'>
        <div className='mx-auto max-w-[1200px]'>
          <div className='flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:justify-between'>
            {footerData.partners.map((partner, index) => (
              <div key={index} className='flex items-center gap-4'>
                {partner.partnerLogo && (
                  <Image
                    src={partner.partnerLogo.url}
                    alt={partner.partnerName}
                    width={100}
                    height={100}
                    loading='lazy'
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='bg-primaryBgDark z-0 w-full'>
        <div className='relative flex min-h-[300px] w-full flex-col items-center justify-center'>
          {/* Background Text */}
          <Image
            src={footerBackgroundText}
            alt='Footer Background Text'
            width={400}
            height={400}
            className='absolute top-5 left-1/2 z-1 -translate-x-1/2 object-contain'
          />

          {/* Background stars, filling space */}
          <div className='absolute inset-0 z-5 h-full w-full'>
            <BackgroundCanvas />
          </div>

          {/* 3D Model */}
          <div className='relative z-10 h-[200px] w-full'>
            <FooterModel />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
