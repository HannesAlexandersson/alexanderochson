'use client'

import Button from '@/components/Button/Button'
import { MenuContext } from '@/context/MenuProvider'
import useEventListener from '@/hooks/useEventListener'
import pageLinks from '@/lib/pageLinks'
import { cn, isBrowser } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import Typography from '../Typography/Typography'

const Menu = ({ withBg = true, variant = 'light' }) => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('Menu must be used within a MenuContextProvider')
  }

  const { showMenu, toggle, navbarData } = context
  const [isNavDown, setIsNavDown] = useState(true)
  const [scrollPos, setScrollPos] = useState(0)

  const isNavBellow = () => {
    if (!isBrowser()) return false

    return isNavDown && scrollPos > window.innerHeight / 3
  }

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Escape' && showMenu) {
      ev.preventDefault()
      toggle(false)
    }
  }

  const handleScroll = () => {
    const { scrollY } = window
    const isScrollingDown = scrollY > scrollPos
    const isScrollingUp = scrollY < scrollPos
    const isPastThreshold = Math.abs(scrollY - scrollPos) > 5
    const isPastScreenThird = scrollPos > window.innerHeight / 3 - 50

    if (isNavDown && isPastScreenThird && isScrollingDown && isPastThreshold) {
      setIsNavDown(false)
      if (showMenu) toggle(false)
    }

    if (isScrollingUp && isPastThreshold && !isNavDown) {
      setIsNavDown(true)
    }

    setScrollPos(scrollY)
  }

  const handleToggle = () => {
    if (!isNavDown) return
    toggle(!showMenu)
  }

  useEventListener<KeyboardEvent>({
    event: 'keydown',
    callback: handleKeyDown,
  })

  useEventListener({
    event: 'scroll',
    callback: handleScroll,
  })

  return (
    <>
      <nav
        className={cn(
          'fixed inset-0 z-30 flex h-20 items-center justify-between overflow-y-visible bg-transparent px-4 text-white transition-all duration-300 select-none md:px-6 xl:px-6',
          { 'opacity-0': !isNavDown },
          { 'bg-secondaryBg shadow-lg': withBg || isNavBellow() },
          { 'bg-primaryBgDark': variant === 'dark' },
        )}
      >
        <Link href={'/'}>
          {variant === 'dark' ? (
            <Image
              src={navbarData.logoDark}
              alt='corporate logo'
              width={200 / 1.1}
              height={36 / 1.1}
              className='max-w-[130px] md:max-w-none'
            />
          ) : (
            <Image
              src={navbarData.logo}
              alt='corporate logo'
              width={200 / 1.1}
              height={36 / 1.1}
              className='max-w-[130px] md:max-w-none'
            />
          )}
        </Link>
        <div className='hidden xl:flex xl:items-center xl:justify-center xl:gap-5 xl:py-5 xl:pr-5'>
          {pageLinks.map(link => (
            <Link key={link.path} href={link.path}>
              <Typography
                variant='p'
                className={cn(
                  'group font-inria-sherif text-primaryText relative text-2xl font-normal transition-colors duration-300 hover:text-slate-900',
                  { 'text-primaryBg': variant === 'dark' },
                )}
              >
                {link.title}
                <span className='absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-[#2F3BEA] to-[#B1159F] opacity-0 transition group-hover:opacity-100'></span>
              </Typography>
            </Link>
          ))}
        </div>
      </nav>
      {/* on mobile show hamburger menu */}
      <Button
        onClick={handleToggle}
        className={cn(
          'hover:bg-primaryAccent fixed top-10 right-6 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center gap-1 p-0 transition-opacity duration-300 xl:right-16 xl:hidden',
          { 'bg-transparent hover:bg-transparent': !withBg && !isNavBellow() },
          { 'cursor-default opacity-0': !isNavDown },
        )}
        disabled={!isNavDown}
        variant={'primary'}
        aria-label='Open navigation menu'
      >
        <div className={cn('hamburger-line', { 'line-1': showMenu })} />
        <div className={cn('hamburger-line', { 'line-2': showMenu })} />
        <div className={cn('hamburger-line', { 'line-3': showMenu })} />
      </Button>
    </>
  )
}

export default Menu
