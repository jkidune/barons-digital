import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SmoothScrollProvider>
  )
}
