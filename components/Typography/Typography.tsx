import { cn } from '@/utils/utils'
import { cva } from 'class-variance-authority'
import { TypographyProps } from './Typography.types'

const typographyVariants = cva('leading-normal', {
  variants: {
    variant: {
      h1: 'text-6xl font-bold md:text-7xl',
      h2: 'text-4xl font-bold md:text-5xl',
      h3: 'text-3xl font-semibold md:text-4xl',
      h4: 'text-lg font-semibold md:text-xl',
      h5: 'text-md font-medium md:text-lg',
      h6: 'text-md font-medium',
      p: 'font-normal',
      blockquote: 'border-l-4 pl-4 italic text-gray-600',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    { variant: 'p', size: 'sm', class: 'text-sm' },
    { variant: 'p', size: 'md', class: 'text-base' },
    { variant: 'p', size: 'lg', class: 'text-lg' },
  ],
  defaultVariants: {
    variant: 'p',
    size: 'md',
  },
})

const Typography = ({ children, className, variant = 'p', size, ...props }: TypographyProps) => {
  const Element = variant

  return (
    <Element
      className={cn(typographyVariants({ size, variant, className }))}
      {...props}
    >
      {children}
    </Element>
  )
}

export default Typography