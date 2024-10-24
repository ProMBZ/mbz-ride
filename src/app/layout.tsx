import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>MBZ Ride</title> {/* Add the title here */}
        </head>
        <body>
          {children} {/* Render children first to maintain the layout */}
        </body>
      </html>
    </ClerkProvider>
  )
}
