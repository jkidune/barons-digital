'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface InitialLoadContextType {
  isInitialLoad: boolean
}

const InitialLoadContext = createContext<InitialLoadContextType | undefined>(undefined)

export function InitialLoadProvider({ children }: { children: ReactNode }) {
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    // Matches the preloader duration: ~1s count + 0.8s hold + ~0.8s exit
    const t = setTimeout(() => setIsInitialLoad(false), 2800)
    return () => clearTimeout(t)
  }, [])

  return (
    <InitialLoadContext.Provider value={{ isInitialLoad }}>
      {children}
    </InitialLoadContext.Provider>
  )
}

export default function useInitialLoad() {
  const context = useContext(InitialLoadContext)
  if (!context) throw new Error('useInitialLoad must be used within InitialLoadProvider')
  return context
}
