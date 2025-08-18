import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f97316" />
        <meta name="color-scheme" content="light dark" />
        {/* Prevent flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Suppress hydration warnings for browser extensions
                  const originalError = console.error;
                  console.error = function(...args) {
                    if (args[0] && args[0].includes && (
                      args[0].includes('hydrated') || 
                      args[0].includes('data-darkreader') ||
                      args[0].includes('browser extension')
                    )) {
                      return;
                    }
                    originalError.apply(console, args);
                  };
                } catch (e) {}
              })();
            `,
          }}
        />
      </Head>
      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
