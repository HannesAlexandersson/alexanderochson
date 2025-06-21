'use client'

import { createContext, useState } from 'react'

type MenuContextType = {
  showMenu: boolean;
  showBackdrop: boolean;
  toggle: (show: boolean) => void;
  navbarData: NavbarData;
};

type MenuContextProviderProps = {
  children: React.ReactNode
  navbarData: NavbarData
}
type NavbarData = {  
  logo:  string 
  logoDark:  string  
}


export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuContextProvider = (props: MenuContextProviderProps) => {
  const { children, navbarData } = props
  const [showMenu, setShowMenu] = useState(false)
  const [showBackdrop, setShowBackdrop] = useState(false)

  const toggle = (show: boolean) => {
    setShowMenu(show)
    setTimeout(() => setShowBackdrop(show), !show ? 300 : 0)
  }

  return (
    <MenuContext.Provider value={{ showMenu, showBackdrop, toggle, navbarData }}>
      {children}
    </MenuContext.Provider>
  )
}