import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'cursor-pointer outline-none rounded-full select-none transition duration-200 disabled:cursor-default disabled:brightness-50',
  {
    variants: {
      variant: {
        primary: 'bg-secondaryAccent text-white hover:bg-primaryAccent',
        secondary: 'bg-transparent border-2 border-secondaryAccent text-secondaryAccent hover:bg-secondaryAccent hover:text-white',
       
      },
      size: {
        sm: 'px-4 py-2 text-sm font-medium',
        md: 'px-4 py-3 text-base font-medium',
        lg: 'px-4 py-3 text-lg font-medium',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)