// Type definitions
export interface Template {
  id?: string
  title: string
  description: string
  keywords: string[]
  images: string[]
  slug: string
  featured?: boolean
  category?: string
  createdAt?: string
  updatedAt?: string
}

export interface TemplateCardProps extends Template {
  onView?: (slug: string) => void
  onEdit?: (slug: string) => void
  className?: string
}

export interface TemplateDisplayCardsProps {
  templates?: Template[]
  loading?: boolean
  error?: string | null
  onView?: (slug: string) => void
  onEdit?: (slug: string) => void
  className?: string
}

export interface FloatingCubeProps {
  color?: string
}
