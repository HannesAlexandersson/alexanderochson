import { DynamicIcon } from 'lucide-react/dynamic'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

type DynamicIconProps = {
  iconName: string
  iconColor?: string
  iconSize?: number | string
}

const Icon = ({
  iconName,
  iconSize,
  iconColor,
  ...props
}: DynamicIconProps) => {
  if (!iconName) {
    console.warn('Icon name is required')
    return null
  }

  return (
    <DynamicIcon
      name={iconName as keyof typeof dynamicIconImports}
      color={iconColor ?? 'gold'}
      size={iconSize ?? 48}
      {...props}
    />
  )
}
export default Icon
