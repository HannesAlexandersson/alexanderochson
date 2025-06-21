import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/templates')
        if (!response.ok) {
          throw new Error('Failed to fetch templates')
        }
        const data = await response.json()
        setTemplates(data.templates || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])

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
