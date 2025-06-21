import { CardSliderData } from '@/utils/globalTypes'

export type CardProps = {
  cardTitle: string
  cardText: string
  cardIcon?: string
  className?: string
}

export interface ServiceCardProps {
  cardTitle: string
  cardText: string
  iconName: string
  order: number
}

export interface FeatureCardProps extends CardSliderData {
  className?: string
}
