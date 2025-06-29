'use client'

import { cn } from '@/utils/utils'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import FeatureCard from '../Card/FeatureCard/FeatureCard'
import { CardSliderProps } from './CardSlider.types'

const CardSlider = ({ cardData, ...classNames }: CardSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const scrollAmount = direction === 'left' ? -clientWidth : clientWidth
    scrollRef.current.scrollTo({
      left: scrollLeft + scrollAmount,
      behavior: 'smooth',
    })
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDragging.current = true
    scrollRef.current.classList.add('cursor-grabbing')
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }

  const onMouseLeaveOrUp = () => {
    isDragging.current = false
    scrollRef.current?.classList.remove('cursor-grabbing')
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1 // drag speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <div
      className={cn(
        `relative mb-8 w-full overflow-x-hidden md:mb-10 lg:mb-12`,
        classNames,
      )}
    >
      {/* Arrow Buttons */}
      <button
        onClick={() => scroll('left')}
        className='bg-secondaryAccent hover:bg-primaryAccent absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-md'
      >
        <ChevronLeft color='white' />
      </button>
      <button
        onClick={() => scroll('right')}
        className='bg-secondaryAccent hover:bg-primaryAccent absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-md'
      >
        <ChevronRight color='white' />
      </button>

      {/* Scrollable Card Track */}
      <motion.div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseLeaveOrUp}
        onMouseLeave={onMouseLeaveOrUp}
        onMouseMove={onMouseMove}
        className='no-scrollbar flex w-full cursor-grabbing items-center gap-4 overflow-x-auto px-10 py-18 select-none md:py-22'
        whileTap={{ cursor: 'grabbing' }}
      >
        {cardData.map(card => (
          <motion.div key={card.sys.id} className='shrink-0'>
            <FeatureCard
              cardTitle={card.cardTitle}
              cardText={card.cardText}
              nameOfIcon={card.nameOfIcon}
              order={card.order}
              sys={card.sys}
              price={card.price}
              nameOfIconColor={card.nameOfIconColor}
              className='select-none'
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default CardSlider
