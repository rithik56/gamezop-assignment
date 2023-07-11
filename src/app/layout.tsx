import React from 'react'
import Header from './components/Header'
import styles from './layout.module.css'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body>
        <Header />
        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  )
}
