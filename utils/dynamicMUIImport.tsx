import { SvgIconComponent } from '@mui/icons-material'

export async function getIcon(name: string) {
  const iconImportName = name + 'Icon'
  const iconImport = `@mui/icons-material/${iconImportName}`

  let icon: SvgIconComponent
  try {
    icon = (await import(iconImport)) as SvgIconComponent
  } catch (error) {
    console.error(`Icon ${iconImportName} not found in ${iconImport}`, error)
    return null // or return a default icon
  }

  return icon as SvgIconComponent
}
