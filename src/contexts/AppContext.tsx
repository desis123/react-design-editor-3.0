import { PanelType } from "~/constants/app-options"
import React, { createContext, useState } from "react"

interface IAppContext {
  isMobile: boolean | undefined
  setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>
  activePanel: PanelType
  setActivePanel: (option: PanelType) => void
  activeSubMenu: string | null
  setActiveSubMenu: (option: string) => void
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  activePanel: PanelType.TEMPLATES,
  setActivePanel: () => {},
  activeSubMenu: null,
  setActiveSubMenu: (value: string) => {},
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)
  const [activePanel, setActivePanel] = useState<PanelType>(PanelType.TEMPLATES)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const context = {
    isMobile,
    setIsMobile,
    activePanel,
    setActivePanel,
    activeSubMenu,
    setActiveSubMenu,
  }
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
