import { Document as RichTextDocument } from '@contentful/rich-text-types'
export interface QuoteSectionProps {
  quoteItem: {
    sys: { id: string }
    quoteTitle: string
    quoteText: { json: RichTextDocument }
    quoteAuthor: string
  }
  className?: string
}
