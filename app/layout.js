import './globals.css'

export const metadata = {
  title: 'Demo Site Generator | Optimo Agency',
  description: 'Generate professional demo websites in seconds',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
