import QuoteTextBlock from '@/components/QuoteTextBlock/QuoteTextBlock'
import { cn } from '@/utils/utils'
import { ContentfulLivePreview } from '@contentful/live-preview'
import Typography from '../Typography/Typography'
import { QuoteSectionProps } from './QuoteSection.types'

export default async function QuoteSection({
  quoteItem,
  className,
  ...props
}: QuoteSectionProps) {
  return (
    <section
      className={cn(
        'flex w-full flex-col items-center justify-center gap-7 bg-gradient-to-b from-[#6B62CC] via-[#9B53CC] to-[#CB43CB] px-4 py-6 md:px-6 md:py-8 lg:min-h-[718px] lg:px-10 lg:py-10',
        className,
        { ...props },
      )}
    >
      {quoteItem?.quoteText && (
        <div
          className='text-center'
          {...ContentfulLivePreview.getProps({
            entryId: quoteItem.sys.id,
            fieldId: 'quoteText',
            locale: 'en-US',
          })}
        >
          <QuoteTextBlock block={quoteItem.quoteText.json} />
        </div>
      )}

      {quoteItem?.quoteAuthor && (
        <Typography
          variant='p'
          className='text-secondaryBg font-inria-sherif text-center text-sm leading-normal font-light md:text-[24px] lg:text-[32px]'
        >
          {quoteItem.quoteAuthor}
        </Typography>
      )}
    </section>
  )
}
