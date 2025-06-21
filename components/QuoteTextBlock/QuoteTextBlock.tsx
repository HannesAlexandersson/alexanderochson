import { QuoteTextBlockProps } from '@/utils/globalTypes'
import { cn } from '@/utils/utils'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Node } from '@contentful/rich-text-types'
import React, { ReactNode } from 'react'
import Typography from '../Typography/Typography'

const QuoteTextBlock = ({
  block,
  className,
  ...props
}: QuoteTextBlockProps) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Node, children: ReactNode) => (
        <Typography
          variant='p'
          className='text-secondaryBg font-inria-sherif text-center text-2xl font-light italic md:text-4xl lg:text-6xl lg:leading-[80px]'
        >
          {children}
        </Typography>
      ),
    },
  }

  return (
    <div className={cn('quote-text-block', className)} {...props}>
      {documentToReactComponents(block, options)}
    </div>
  )
}

export default QuoteTextBlock
