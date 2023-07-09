import React from 'react'
import Header from './components/Header'
import styles from './layout.module.css'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  )
}
