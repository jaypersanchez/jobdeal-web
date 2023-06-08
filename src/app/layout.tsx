import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JobDeal',
  description: 'JobDeal MVP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={`${inter.className} dark:bg-[#131416]`}>{children}</body>
    </html>
  )
}
