import { Canvas, useFrame } from '@react-three/fiber'
import {
  AnimatePresence,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Eye, Tag } from 'lucide-react'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import {
  FloatingCubeProps,
  Template,
  TemplateCardProps,
  TemplateDisplayCardsProps,
} from '../DesignDisplay.interfaces'

// Floating 3D element for visual enhancement
const FloatingCube: React.FC<FloatingCubeProps> = ({ color = '#3b82f6' }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(state => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} transparent opacity={0.8} />
    </mesh>
  )
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  description,
  keywords = [],
  images = [],
  slug,
  onView,
  onEdit,
  featured = false,
  className = '',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)

  const x = useMotionValue(0)
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const nextImage = (): void => {
    setCurrentImageIndex(prev => (prev + 1) % images.length)
    setImageLoaded(false)
  }

  const prevImage = (): void => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)
    setImageLoaded(false)
  }

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void => {
    if (images.length <= 1) return

    if (info.offset.x > 50) {
      prevImage()
    } else if (info.offset.x < -50) {
      nextImage()
    }
  }

  const handleImageLoad = (): void => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = (): void => {
    setImageError(true)
    setImageLoaded(true)
  }

  const handleView = (): void => {
    onView?.(slug)
  }

  const handleEdit = (): void => {
    onEdit?.(slug)
  }

  const handleDotClick = (index: number): void => {
    setCurrentImageIndex(index)
    setImageLoaded(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{
        y: -8,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      }}
      style={{ rotateY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg ${
        featured ? 'ring-opacity-50 ring-2 ring-blue-500' : ''
      } ${className}`}
    >
      {/* Featured badge */}
      {featured && (
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className='absolute top-4 left-4 z-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-lg'
        >
          Featured
        </motion.div>
      )}

      {/* 3D Element for featured cards */}
      {featured && (
        <div className='absolute top-4 right-4 z-10 h-12 w-12'>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingCube />
          </Canvas>
        </div>
      )}

      {/* Image Carousel */}
      <div className='relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200'>
        {images.length > 0 ? (
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className='absolute inset-0'
            >
              {!imageError ? (
                <motion.img
                  drag={images.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  src={images[currentImageIndex]}
                  alt={`${title} - Preview ${currentImageIndex + 1}`}
                  className='h-full w-full object-cover'
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  whileDrag={{ scale: 0.95 }}
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center bg-gray-200'>
                  <span className='text-sm text-gray-400'>
                    Image not available
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
            <span className='text-sm text-gray-400'>No images available</span>
          </div>
        )}

        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className='absolute inset-0 animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300' />
        )}

        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={prevImage}
                  type='button'
                  aria-label='Previous image'
                  className='absolute top-1/2 left-3 -translate-y-1/2 transform rounded-full bg-white/90 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white'
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={nextImage}
                  type='button'
                  aria-label='Next image'
                  className='absolute top-1/2 right-3 -translate-y-1/2 transform rounded-full bg-white/90 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white'
                >
                  <ChevronRight size={18} />
                </motion.button>
              </>
            )}
          </AnimatePresence>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            className='absolute right-3 bottom-3 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm'
          >
            {currentImageIndex + 1} / {images.length}
          </motion.div>
        )}

        {/* Image dots indicator */}
        {images.length > 1 && images.length <= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0.5, y: 0 }}
            className='absolute bottom-3 left-1/2 flex -translate-x-1/2 transform space-x-2'
          >
            {images.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDotClick(index)}
                type='button'
                aria-label={`Go to image ${index + 1}`}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </motion.div>
        )}

        {/* View overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className='absolute inset-0 flex items-center justify-center bg-black/20'
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            className='rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm'
          >
            <Eye size={24} className='text-gray-800' />
          </motion.div>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className='p-6'>
        {/* Title */}
        <motion.h3
          layout
          className='mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600'
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          layout
          className='mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600'
        >
          {description}
        </motion.p>

        {/* Keywords */}
        {keywords.length > 0 && (
          <motion.div layout className='mb-4 flex flex-wrap gap-2'>
            {keywords.slice(0, 4).map((keyword, index) => (
              <motion.span
                key={`${keyword}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className='inline-flex items-center rounded-full border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 text-xs text-blue-700 transition-colors duration-200 hover:border-blue-200'
              >
                <Tag size={10} className='mr-1' />
                {keyword}
              </motion.span>
            ))}
            {keywords.length > 4 && (
              <span className='self-center text-xs text-gray-500'>
                +{keywords.length - 4} more
              </span>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className='flex gap-3'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleView}
            type='button'
            className='flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'
          >
            <Eye size={16} />
            Preview
          </motion.button>
          {onEdit && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              type='button'
              aria-label='Edit template'
              className='rounded-xl bg-gray-100 p-3 text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-200 hover:shadow-md'
            >
              <ExternalLink size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Loading skeleton component
const TemplateCardSkeleton: React.FC = () => (
  <div className='animate-pulse overflow-hidden rounded-2xl bg-white shadow-lg'>
    <div className='h-64 bg-gray-300' />
    <div className='p-6'>
      <div className='mb-3 h-6 rounded bg-gray-300' />
      <div className='mb-2 h-4 rounded bg-gray-200' />
      <div className='mb-4 h-4 w-3/4 rounded bg-gray-200' />
      <div className='mb-4 flex gap-2'>
        <div className='h-6 w-16 rounded-full bg-gray-200' />
        <div className='h-6 w-20 rounded-full bg-gray-200' />
      </div>
      <div className='h-10 rounded-xl bg-gray-300' />
    </div>
  </div>
)

// Error component
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className='col-span-full flex items-center justify-center p-12'>
    <div className='text-center'>
      <div className='mb-2 text-lg text-gray-400'>⚠️</div>
      <p className='text-gray-600'>{message}</p>
    </div>
  </div>
)

// Main component
const TemplateDisplayCards: React.FC<TemplateDisplayCardsProps> = ({
  templates = [],
  loading = false,
  error = null,
  onView,
  onEdit,
  className = '',
}) => {
  // Sample data for demonstration when no templates provided
  const sampleTemplates: Template[] = [
    {
      id: '1',
      title: 'Modern Business Card Template',
      description:
        'Clean and professional business card design with minimalist aesthetic. Perfect for corporate professionals and entrepreneurs looking to make a lasting impression.',
      keywords: ['business', 'modern', 'professional', 'clean', 'corporate'],
      images: [
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1600132806608-231446b2e7af?w=500&h=400&fit=crop',
      ],
      slug: 'modern-business-card',
      featured: true,
    },
    {
      id: '2',
      title: 'Creative Portfolio Layout',
      description:
        'Eye-catching portfolio template designed for creative professionals. Features bold typography and dynamic layouts that showcase your work beautifully.',
      keywords: ['portfolio', 'creative', 'design', 'bold', 'typography'],
      images: [
        'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1558655146-9f40138c3718?w=500&h=400&fit=crop',
      ],
      slug: 'creative-portfolio-layout',
      featured: false,
    },
    {
      id: '3',
      title: 'Elegant Wedding Invitation',
      description:
        'Sophisticated wedding invitation template with floral elements and elegant typography. Completely customizable for any wedding theme or color scheme.',
      keywords: ['wedding', 'elegant', 'floral', 'invitation', 'romantic'],
      images: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop',
      ],
      slug: 'elegant-wedding-invitation',
      featured: true,
    },
  ]

  const displayTemplates = templates.length > 0 ? templates : sampleTemplates

  const handleView = (slug: string): void => {
    onView?.(slug)
    // In Next.js: router.push(`/templates/${slug}`)
  }

  const handleEdit = (slug: string): void => {
    onEdit?.(slug)
    // In Next.js: router.push(`/templates/${slug}/edit`)
  }

  if (error) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 ${className}`}
      >
        <div className='mx-auto max-w-7xl px-6 py-12'>
          <div className='grid grid-cols-1 gap-8'>
            <ErrorMessage message={error} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 ${className}`}
    >
      <div className='mx-auto max-w-7xl px-6 py-12'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-12 text-center'
        >
          <h1 className='mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-4xl font-bold text-transparent md:text-5xl'>
            Template Design Gallery
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            Discover professionally crafted templates for all your design needs
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'
        >
          {loading ? (
            // Show loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <TemplateCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            <AnimatePresence>
              {displayTemplates.map((template, index) => (
                <motion.div
                  key={template.id || template.slug || index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TemplateCard
                    {...template}
                    onView={handleView}
                    onEdit={handleEdit}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Empty state */}
        {!loading && displayTemplates.length === 0 && (
          <div className='col-span-full flex items-center justify-center p-12'>
            <div className='text-center'>
              <div className='mb-4 text-6xl text-gray-400'>📋</div>
              <h3 className='mb-2 text-xl font-semibold text-gray-700'>
                No templates found
              </h3>
              <p className='text-gray-500'>
                Check back later for new template designs.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplateDisplayCards
export type { Template, TemplateCardProps, TemplateDisplayCardsProps }
