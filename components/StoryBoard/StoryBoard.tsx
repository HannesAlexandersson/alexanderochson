'use client'

import { fadeIn, textVariant } from '@/lib/motion'
import { styles } from '@/utils/styles'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { richTextOptions } from '../RichTextOptions/RichTextOptions'
import { StoryBoardProps } from './StoryBoard.types'

// StoryBoard component displays a section with a title, subtitle, and rich text content
// It also includes an image that is displayed alongside the text content
// divided into two columns on larger screens
const StoryBoard: React.FC<StoryBoardProps> = ({ textsections }) => {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center'>
      <div>
        <motion.div variants={textVariant(0.5)}>
          <p className={`${styles.sectionSubText}`}>
            {textsections.sectionHeadText}
          </p>
          <h2 className={`${styles.sectionHeadText}`}>
            {textsections.sectionSubText}
          </h2>
        </motion.div>

        <motion.hgroup
          variants={fadeIn('', '', 0.1, 1)}
          className='text-secondaryText font-inria-sherif mt-4 max-w-3xl text-[17px] leading-[30px]'
          {...ContentfulLivePreview.getProps({
            entryId: textsections?.sys?.id ?? '',
            fieldId: 'paragraph',
            locale: 'sv-SE',
          })}
        >
          {documentToReactComponents(textsections.text, richTextOptions)}
        </motion.hgroup>
      </div>
      <motion.div
        variants={fadeIn('', '', 0.1, 1)}
        className='flex justify-center'
      >
        <Image
          src={textsections.image?.url || ''}
          alt={textsections.image?.description || 'Story Image'}
          width={3120}
          height={1760}
          className='rounded-lg object-contain'
          {...ContentfulLivePreview.getProps({
            assetId: textsections?.image?.sys?.id ?? '',
            fieldId: 'asset',
            locale: 'sv-SE',
          })}
        />
      </motion.div>
    </div>
  )
}

export default StoryBoard
