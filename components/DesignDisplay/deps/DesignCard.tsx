import {
  AnimatePresence,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Eye, Tag } from 'lucide-react'
import React, { useState } from 'react'
import { TemplateCardProps } from '../DesignDisplay.interfaces'

const TemplateCard: React.FC<TemplateCardProps> = ({
  templates,
  onView,
  className = '',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)

  const x = useMotionValue(0)
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  // Create images array from CMS data
  const allImages =
    templates?.designImagesCollection?.items
      .map(image => image.url)
      .filter(url => url) || []

  const nextImage = (): void => {
    if (allImages?.length > 1) {
      setCurrentImageIndex(prev => (prev + 1) % allImages.length)
      setImageLoaded(false)
    }
  }

  const prevImage = (): void => {
    if (allImages.length > 1) {
      setCurrentImageIndex(
        prev => (prev - 1 + allImages.length) % allImages.length,
      )
      setImageLoaded(false)
    }
  }

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void => {
    if (allImages.length <= 1) return

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
    onView?.(templates?.slug ?? '')
  }

  const handleDotClick = (index: number): void => {
    setCurrentImageIndex(index)
    setImageLoaded(false)
  }

  const handleExternalLink = (): void => {
    if (templates?.exampleLink) {
      window.open(templates?.exampleLink, '_blank', 'noopener,noreferrer')
    }
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
      className={`group bg-primaryBg relative cursor-pointer overflow-hidden rounded-2xl shadow-lg ${className}`}
    >
      {/* Image Carousel */}
      <div className='relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200'>
        {allImages.length > 0 ? (
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
                  drag={allImages.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  src={allImages[currentImageIndex]}
                  alt={`${templates?.designTitle} - Preview ${currentImageIndex + 1}`}
                  className='h-full w-full object-cover'
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  whileDrag={{ scale: 0.95 }}
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center bg-gray-200'>
                  <div className='text-center'>
                    <div className='mb-2 text-4xl text-gray-400'>🖼️</div>
                    <span className='text-sm text-gray-400'>
                      Preview not available
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
            <div className='text-center'>
              <div className='mb-2 text-4xl text-gray-400'>📋</div>
              <span className='text-sm text-gray-400'>
                No preview available
              </span>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {!imageLoaded && !imageError && allImages.length > 0 && (
          <div className='absolute inset-0 animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300' />
        )}

        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />

        {/* Navigation arrows */}
        {allImages.length > 1 && (
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
                  className='absolute top-1/2 left-3 -translate-y-1/2 transform rounded-full bg-white/90 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/90 hover:text-white'
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
                  className='absolute top-1/2 right-3 -translate-y-1/2 transform rounded-full bg-white/90 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/90 hover:text-white'
                >
                  <ChevronRight size={18} />
                </motion.button>
              </>
            )}
          </AnimatePresence>
        )}

        {/* Image counter */}
        {allImages.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            className='absolute right-3 bottom-3 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm'
          >
            {currentImageIndex + 1} / {allImages.length}
          </motion.div>
        )}

        {/* Image dots indicator */}
        {allImages.length > 1 && allImages.length <= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0.5, y: 0 }}
            className='absolute bottom-3 left-1/2 flex -translate-x-1/2 transform space-x-2'
          >
            {allImages.map((_, index) => (
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
          className='text-primaryText font-poppins group-hover:text-radialBlue mb-3 line-clamp-2 text-xl font-bold transition-colors duration-200'
        >
          {templates?.designTitle || 'Untitled Template'}
        </motion.h3>

        {/* Description */}
        <motion.p
          layout
          className='text-secondaryText font-inria-sherif mb-4 text-sm leading-relaxed'
        >
          {templates?.description}
        </motion.p>

        {/* Keywords */}
        {templates?.keywords && templates?.keywords.length > 0 && (
          <motion.div layout className='mb-4 flex flex-wrap gap-2'>
            {templates?.keywords.slice(0, 4).map((keyword, index) => (
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
            {templates?.keywords.length > 4 && (
              <span className='self-center text-xs text-gray-500'>
                +{templates?.keywords.length - 4} more
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
            className='bg-secondaryAccent hover:bg-primaryAccent flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl'
          >
            <Eye size={16} />
            Preview
          </motion.button>

          {/* External link button (if exampleLink exists) */}
          {templates?.exampleLink && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExternalLink}
              type='button'
              aria-label='View live example'
              title='View live example'
              className='cursor-pointer rounded-xl bg-gray-100 p-3 text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-200 hover:shadow-md'
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
      <div className='mb-4 text-6xl text-gray-400'>⚠️</div>
      <h3 className='mb-2 text-xl font-semibold text-gray-700'>
        Något gick fel
      </h3>
      <p className='text-gray-600'>{message}</p>
    </div>
  </div>
)

// Main component
const TemplateDisplayCards: React.FC<TemplateCardProps> = ({
  templates,
  error,
  loading = false,
  onView,
  className = '',
}) => {
  // Normalize templates to always be an array
  const templatesArray = Array.isArray(templates) ? templates : [templates]

  const handleView = (slug: string): void => {
    onView?.(slug)
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
              {templatesArray.map((template, index) => (
                <motion.div
                  key={template.slug || index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TemplateCard templates={template} onView={handleView} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Empty state */}
        {!loading && templatesArray.length === 0 && (
          <div className='col-span-full flex items-center justify-center p-12'>
            <div className='text-center'>
              <div className='mb-4 text-6xl text-gray-400'>📋</div>
              <h3 className='mb-2 text-xl font-semibold text-gray-700'>
                Något gick fel och inga templates kunde laddas
              </h3>
              <p className='text-gray-500'>
                Ladda om sidan eller försök igen senare.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplateDisplayCards
