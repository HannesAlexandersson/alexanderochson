'use client'
import { useRouter } from 'next/navigation'
import { TemplateDataProps } from './DesignDisplay.interfaces'
import TemplateDisplayCards from './deps/DesignCard'

interface TemplateProps {
  templatesData: TemplateDataProps
}
const DesignDisplay = ({ templatesData }: TemplateProps) => {
  const router = useRouter()

  const handleView = (slug: string) => {
    console.log('Clicked slug:', slug)
    router.push(`/features/${slug}`)
  }

  return (
    <>
      <TemplateDisplayCards templates={templatesData} onView={handleView} />
    </>
  )
}
export default DesignDisplay
