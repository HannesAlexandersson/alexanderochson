import { cn } from '@/utils/utils'
import React from 'react'
import type { DividerProps } from './Divider.types'
import { dividerVariants } from './Divider.variants'


const Divider = ({  
  className,
  variant = 'primary', // Default variant
  ...props
}: DividerProps) => {
  return (
    <div      
      className={cn(dividerVariants({ variant, className }))}      
      {...props}
    />
      
  )
}

export default Divider