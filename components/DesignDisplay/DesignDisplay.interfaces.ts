export interface TemplateCardProps {
  onView?: (slug: string) => void
  onEdit?: (slug: string) => void
  className?: string
  templates?: TemplateDataProps
  error?: string
  loading?: boolean
}
export interface TemplateDataProps {
  designTitle?: string
  slug?: string
  description?: string
  exampleLink?: string
  designImagesCollection?: {
    items: {
      url: string
    }[]
  }
  keywords?: string[]
}
