import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import Navbar               from '@/components/layout/Navbar'
import Preloader            from '@/components/ui/Preloader'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <SmoothScrollProvider>
        <Navbar />
        <main>{children}</main>
      </SmoothScrollProvider>
    </>
  )
}
