import { forwardRef, isValidElement, cloneElement, Ref } from 'react'
import { cn } from '@/utils/utils' 
import { SlotProps } from './Slot.types'



const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, className, style, ...props }, ref: Ref<HTMLElement>) => {
    if (!isValidElement(children)) return null

    // Check if child is a DOM element (string type)
    const isDomElement = typeof children.type === 'string'

    return cloneElement(children, {
      ...props,
      className: cn(className, children.props.className),
      style: { ...style, ...children.props.style },
      ...(isDomElement ? { ref } : {}), // only pass ref if DOM element
    })
  }
)

Slot.displayName = 'Slot'

export default Slot