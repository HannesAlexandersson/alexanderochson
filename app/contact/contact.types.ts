import { Document as RichTextDocument } from '@contentful/rich-text-types'

export interface ContactDataProps {
  sys?: ContentfulSys
  sectionTitle?: string
  textSectionParagraf?: { json: RichTextDocument }
  sectionBild?: ImageProps
  order: number
}

export interface ContentfulSys {
  id: string
}

export interface ImageProps {
  url: string
  sys?: ContentfulSys
}
