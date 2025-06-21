export type PageTitleProps = {
  children: React.ReactNode
  className?: string
  variant?: 'light' | 'dark'
} & React.HTMLAttributes<HTMLHeadingElement>