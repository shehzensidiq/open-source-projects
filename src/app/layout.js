import './globals.css'

export const metadata = {
  title: 'Blog App',
  description: 'A Next.js blog application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
