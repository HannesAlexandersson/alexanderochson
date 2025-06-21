'use client'

import { MenuContext } from '@/context/MenuProvider'
import pageLinks from '@/lib/pageLinks'
import { cn } from '@/utils/utils'
import Link from 'next/link'
import { useContext, useState } from 'react'
import Typography from '../Typography/Typography'

const MenuList = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('Menu must be used within a MenuContextProvider')
  }
  const { showBackdrop, showMenu, toggle } = context
  const [linkIndex, setLinkIndex] = useState<number | null>(null)

  return (
    <>
      <div
        onClick={() => toggle(false)}
        className={cn(
          'fixed inset-0 z-40 h-screen w-screen translate-x-0 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300',
          { 'opacity-100': showMenu },
          { 'translate-x-full': !showBackdrop },
        )}
      />
      <aside
        className={cn(
          'bg-secondaryAccent fixed top-0 left-full z-50 flex h-screen w-full max-w-[500px] scroll-pt-20 flex-col overflow-y-auto px-6 pt-20 pb-6 text-white transition-all duration-300 xl:p-16',
          { '-translate-x-full': showMenu },
        )}
      >
        {pageLinks.map((link, index) => (
          <div
            key={link.path}
            className={cn('transition-colors duration-300', {
              'text-primaryAccent': index !== linkIndex && linkIndex !== null,
            })}
            onMouseEnter={() => setLinkIndex(index)}
            onMouseLeave={() => setLinkIndex(null)}
          >
            <Link href={link.path}>
              <Typography
                onClick={() => toggle(false)}
                className={'py-2 text-end text-xl font-medium uppercase'}
                size='lg'
              >
                {link.title}
              </Typography>
            </Link>
          </div>
        ))}
      </aside>
    </>
  )
}

export default MenuList
