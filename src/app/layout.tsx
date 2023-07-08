import Navigation from "@/components/navigation"
import Drawer from "@/components/drawer"
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <Drawer />
        {children}
      </body>
    </html>
  )
}
