'use client'

import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import Icon from '../../FontIcon/Icon'
import Typography from '../../Typography/Typography'
import { ServiceCardProps } from '../Card.types'
import { fadeIn } from '../Card.utils'

const ServiceCard: React.FC<ServiceCardProps> = ({
  order,
  cardText,
  cardTitle,
  iconName,
}) => {
  return (
    <Tilt className='bg-primaryBg xs:w-[250px] flex min-h-[300px] w-full max-w-[442px] shrink-0 flex-col items-center justify-center rounded-4xl border-none shadow-2xl'>
      <motion.div
        variants={fadeIn('right', 'spring', (order - 1) * 0.5, 0.75)}
        className='green-pink-gradient shadow-card flex w-full flex-col items-center justify-center rounded-[20px] p-[1px]'
      >
        <div className='flex flex-col items-center justify-center gap-2.5 self-stretch px-4 py-6'>
          <Icon iconName={iconName} iconColor='gold' iconSize={48} />
          <Typography
            variant='h3'
            className='text-primaryText text-center text-[28px] font-bold'
          >
            {cardTitle}
          </Typography>
          <Typography
            variant='p'
            className='text-secondaryText font-inria-sherif text-center text-[16px] font-normal'
          >
            {cardText}
          </Typography>
        </div>
      </motion.div>
    </Tilt>
  )
}

export default ServiceCard
