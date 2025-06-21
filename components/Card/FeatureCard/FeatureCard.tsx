'use client'

import { richTextOptions } from '@/components/RichTextOptions/RichTextOptions'
import { cn } from '@/utils/utils'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import Icon from '../../FontIcon/Icon'
import Typography from '../../Typography/Typography'
import { FeatureCardProps } from '../Card.types'
import { fadeIn } from '../Card.utils'

const FeatureCard: React.FC<FeatureCardProps> = ({
  order,
  cardText,
  cardTitle,
  nameOfIcon,
  price,
  nameOfIconColor,
  className,
  ...props
}) => {
  return (
    <Tilt
      className={cn(
        `bg-secondaryBg flex min-h-[300px] w-[80vw] max-w-[350px] shrink-0 flex-col items-center justify-center rounded-4xl border-none shadow-2xl`,
        className,
        { props },
      )}
    >
      {/* Using the nameOfIcon prop to dynamically render the icon */}
      <motion.div
        variants={fadeIn('right', 'spring', (order - 1) * 0.5, 0.75)}
        className='green-pink-gradient shadow-card flex w-full flex-col items-center justify-center rounded-[20px] p-[1px]'
      >
        <div className='flex flex-col items-center justify-center gap-2.5 self-stretch px-4 py-6'>
          <Icon
            iconName={nameOfIcon}
            iconColor={nameOfIconColor ?? 'gold'}
            iconSize={48}
          />
          <Typography
            variant='h3'
            className='text-primaryText font-bebas text-center text-[28px] font-bold'
          >
            {cardTitle}
          </Typography>
          {price && (
            <Typography variant='h6' className='text-primaryText text-center'>
              {price}kr / månad
            </Typography>
          )}
          <div className='text-primaryText font-inria-sherif flex flex-col items-start text-left text-[16px]'>
            {cardText &&
              documentToReactComponents(cardText.json, richTextOptions)}
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}

export default FeatureCard
