import { useRouter } from 'next/router'
import { useState } from 'react'
import { Template } from './DesignDisplay.interfaces'
import TemplateDisplayCards from './deps/DesignCard'

const DesignDisplay = () => {
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleView = (slug: string) => {
    router.push(`/templates/${slug}`)
  }

  const handleEdit = (slug: string) => {
    router.push(`/templates/${slug}`)
  }

  return (
    <TemplateDisplayCards
      templates={templates}
      loading={loading}
      error={error}
      onView={handleView}
      onEdit={handleEdit}
    />
  )
}
export default DesignDisplay
