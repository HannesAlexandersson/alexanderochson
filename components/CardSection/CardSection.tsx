import { cn } from '@/utils/utils'
import ServiceCard from '../Card/ServiceCard/ServiceCard'
import { CardSectionProps } from './CardSection.types'

const CardSection = async ({
  cardsData,
  className,
  ...props
}: CardSectionProps) => {
  return (
    <div
      className={cn(
        'mx-6 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:mx-12',
        className,
        { ...props },
      )}
    >
      {cardsData.map(card => (
        <ServiceCard
          key={card.order}
          cardTitle={card.cardTitle}
          cardText={card.cardText}
          iconName={card.nameOfIcon}
          order={card.order}
        />
      ))}
    </div>
  )
}

export default CardSection
