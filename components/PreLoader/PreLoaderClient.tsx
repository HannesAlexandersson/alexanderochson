'use client'

import { useEffect } from 'react'
import styles from './Preloader.module.css'

const PreloaderClient = () => {
  useEffect(() => {
    const handleLoad = () => {
      const preloaderContainer = document.querySelector('.preloader-container')
      if (preloaderContainer) {
        preloaderContainer.setAttribute('style', 'display: none')
        document.body.style.overflowY = 'auto'
      }
    }

    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <div className={`preloader-container ${styles.preloaderContainer}`}>
      <h1 className={`preloader ${styles.preloader}`}>
        {['l', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, index) => (
          <span
            key={index}
            className={`preloader-span ${styles.preloaderSpan} ${styles[`letter${letter.toUpperCase()}`]}`}
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  )
}

export default PreloaderClient
