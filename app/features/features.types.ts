import { ImageProps } from '@/utils/globalTypes'
import { Document as RichTextDocument } from '@contentful/rich-text-types'

export interface CenterDataProps {
  title: string
  text: { json: RichTextDocument }
  image: ImageProps
}
