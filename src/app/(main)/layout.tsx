import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import PageTransition from '@/components/layout/PageTransition'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <PageTransition />
      <Navbar />
      <main className="font-[family-name:var(--font-inter)]">{children}</main>
      <Footer />
    </SmoothScrollProvider>
  )
}
