import Skeleton from '@/components/Skeleton/Skeleton'
import Typography from '@/components/Typography/Typography'
import { cn } from '@/utils/utils'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import React from 'react'
import { richTextOptions } from '../RichTextOptions/RichTextOptions'
import {
  SectionProps,
  TextBlockProps,
  TextBlockSkeletonProps,
} from './TextSection.types'

export const CenterTextBlockSkeleton: React.FC<TextBlockSkeletonProps> = ({
  dark = false,
  ...props
}) => {
  return (
    <div
      className={
        'grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 md:group-data-[reverse="true"]:[&>div]:odd:order-2 md:[&>div]:even:order-2 md:group-data-[reverse="true"]:[&>div]:even:order-1 md:[&>span]:even:order-1'
      }
      {...props}
    >
      <div className='grid grid-rows-10 gap-6'>
        <Skeleton dark={dark} />
        <Skeleton dark={dark} />
        <Skeleton dark={dark} />
      </div>
      <span>
        <Skeleton
          dark={dark}
          className='aspect-square h-full rounded-lg object-cover object-center'
        />
      </span>
    </div>
  )
}

const CenterTextBlock: React.FC<TextBlockProps> & {
  Section: React.FC<SectionProps>
} = ({ block, className, showImage = true, ...props }) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-8 pt-20 pb-12 md:gap-10 lg:gap-12',
        className,
      )}
      {...props}
    >
      <div className='text-primaryText flex flex-col gap-6'>
        <Typography
          {...ContentfulLivePreview.getProps({
            assetId: block?.sys?.id ?? '',
            fieldId: 'logos',
            locale: 'en-US',
          })}
          variant='h2'
          className='font-poppins text-primaryText text-center font-normal'
        >
          {block.sectionTitle}
        </Typography>
        <article
          {...ContentfulLivePreview.getProps({
            assetId: block?.sys?.id ?? '',
            fieldId: 'logos',
            locale: 'en-US',
          })}
          className='font-inria-sherif text-secondaryText flex flex-col gap-4 text-center text-xl font-normal'
        >
          {block.sectionText &&
            documentToReactComponents(block.sectionText.json, richTextOptions)}
        </article>
      </div>
      {showImage && block.sectionImage?.url && (
        <Image
          src={block.sectionImage.url}
          alt='Bild för text blocket'
          width={3120}
          height={1760}
          quality={80}
          className='aspect-square h-full rounded-lg object-cover object-center'
          {...ContentfulLivePreview.getProps({
            assetId: block?.sys?.id ?? '',
            fieldId: 'logos',
            locale: 'en-US',
          })}
        />
      )}
    </div>
  )
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  reverse = false,
  ...props
}) => {
  return (
    <section
      data-reverse={reverse}
      className={cn('group flex flex-col gap-8 md:gap-16', className)}
      {...props}
    >
      {children}
    </section>
  )
}

CenterTextBlock.Section = Section

export default CenterTextBlock
