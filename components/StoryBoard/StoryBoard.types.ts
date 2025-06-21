import { Document } from '@contentful/rich-text-types'
export interface StoryBoardProps {
  textsections: storyTextSections
}

export interface storyTextSections {
  sys?: {
    id: string
  }
  sectionSubText: string
  sectionHeadText: string
  text: Document
  image?: {
    sys: {
      id: string
    }
    url?: string
    description?: string
  }
}
