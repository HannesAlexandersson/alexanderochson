import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(...inputs))

export const isBrowser = (): boolean => typeof window !== 'undefined'
export const isMobile = (): boolean => {
  if (!isBrowser()) return false
  return window.innerWidth <= 768
}

export const displayDate = (date: Date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ]

  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = months[newDate.getMonth()]
  const day = newDate.getDate()

  return `${year} ${month} ${day}`
}

export function getIconByName(name: string) {
  const iconImportName = name + 'Icon'
  const iconImport = `@mui/icons-material/${iconImportName}`

  const iconData = {
    iconName: iconImportName,
    importFrom: iconImport,
  }
  return iconData
}
