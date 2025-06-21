import { ContentfulSys, ImageProps } from '@/utils/globalTypes'
import { Document as RichTextDocument } from '@contentful/rich-text-types'

export interface TextBlockSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean
}

export interface BlockProps {
  sys?: ContentfulSys
  sectionTitle?: string
  sectionText?: { json: RichTextDocument }
  sectionImage?: ImageProps
  order: number
}

export interface TextBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  block: BlockProps
  className?: string
  variant?: 'dark' | 'light'
  showImage?: boolean
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  reverse?: boolean
}
