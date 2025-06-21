import { ContentfulSys } from '@/utils/globalTypes'
import { Document as RichTextDocument } from '@contentful/rich-text-types'

export type RoadMapData = {
  bullets: BulletProps[]
}
export type BulletProps = {
  title: string
  subTitle: string
  points: { json: RichTextDocument }
  sectionIcon: {
    sys: {
      id: ContentfulSys
    }
    url: string
  }
  dates?: string
  order: number
  sys: {
    id: ContentfulSys
  }
}

export interface ExperienceProp {
  title: string
  company_name: string
  date: string
  icon: string
  iconBg: string
  points: string[]
}
