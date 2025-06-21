import { cn } from '@/utils/utils'
import { ButtonProps } from './Button.types'
import { buttonVariants } from './Button.variants'

const Button = ({
  children,
  className,
  variant,
  size, 
  onClick,
  ...props
}: ButtonProps) => {
 

  // If the variant is not provided, default to 'primary'
  variant = variant || 'primary'
  // If the size is not provided, default to 'md'
  size = size || 'md'
  // If the className is not provided, default to an empty string
  className = className || ''
  // Ensure that the variant and size are valid
  const validVariants = ['primary', 'secondary']
  const validSizes = ['sm', 'md', 'lg']
  if (!validVariants.includes(variant)) {
    console.warn(`Invalid variant "${variant}" provided. Defaulting to "primary".`)
    variant = 'primary'
  }
  if (!validSizes.includes(size)) {
    console.warn(`Invalid size "${size}" provided. Defaulting to "md".`)
    size = 'md'
  }

  return (
    <button      
      className={cn(buttonVariants({ size, variant, className }))}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button