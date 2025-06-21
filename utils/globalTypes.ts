import { Document as RichTextDocument } from '@contentful/rich-text-types'

export interface DataProps {
  sys?: ContentfulSys
  sectionTitle?: string
  sectionText?: { json: RichTextDocument }
  sectionImage?: ImageProps
  order: number
}

export interface ContentfulSys {
  id: string
}

export interface ImageProps {
  url: string
  sys?: ContentfulSys
  description?: string
  title?: string
}
export interface CardData {
  sys: { id: string }
  cardTitle: string
  cardText: string
  nameOfIcon: string
  order: number
}
export interface CardSliderData {
  sys: { id: string }
  cardTitle: string
  cardText: { json: RichTextDocument }
  nameOfIcon: string
  order: number
  price?: string
  nameOfIconColor?: string
}

export type QuoteTextBlockProps = {
  block: RichTextDocument
  className?: string
} & React.HTMLAttributes<HTMLDivElement>
