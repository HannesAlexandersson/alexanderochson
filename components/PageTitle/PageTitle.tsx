import Divider from '@/components/Divider/Divider'
import Skeleton from '@/components/Skeleton/Skeleton'
import Typography from '@/components/Typography/Typography'
import { cn } from '@/utils/utils'
import { cva } from 'class-variance-authority'
import { PageTitleProps } from './PageTitle.types'

const title = cva('flex flex-col gap-1 break-words pt-20 pb-10', {
  variants: {
    variant: {
      light: 'text-primaryTextDark',
      dark: 'text-primaryText',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
})

const PageTitle = ({
  children,
  className,
  variant = 'dark',
  ...props
}: PageTitleProps) => {
  return (
    <Typography
      variant='h1'
      className={cn(title({ variant, className }))}
      {...props}
    >
      {children}
      <Divider variant='gradient' />
    </Typography>
  )
}

export const PageTitleSkeleton = ({ dark = false }) => {
  return <Skeleton className={'my-32 h-20'} dark={dark} />
}

export default PageTitle
