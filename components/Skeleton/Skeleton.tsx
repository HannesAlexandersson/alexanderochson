import { cn } from '@/utils/utils'
import { SkeletonProps } from './Skeleton.types'


const Skeleton = ({ className, dark = false, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'h-full w-full animate-pulse rounded-lg bg-zinc-100',
        { 'bg-zinc-800': dark },
        className,
      )}
      {...props}
    />
  )
}

export default Skeleton