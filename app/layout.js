export const metadata = {
  title: 'Deep Night Archives',
  description: 'Interactive Cinematic Web Experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="copyright" content="© 2026 Deep Night Archives. All rights reserved." />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#000000',
        color: '#8B0000',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        fontFamily: 'monospace',
        height: '100dvh',
        width: '100vw'
      }}>
        {children}
      </body>
    </html>
  );
}
