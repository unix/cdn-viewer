import Head from 'next/head'
import React from 'react'
import { ZEITUIProvider, useTheme, CSSBaseline } from '@zeit-ui/react'

const Application = ({ Component, pageProps }) => {
  const theme = useTheme()
  
  return (
    <>
    <Head>
      <title>Package viewer</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="dns-prefetch" href="//cdn.unix.bio" />
      <meta name="google" value="notranslate" />
      <meta name="referrer" content="strict-origin" />
      <meta name="description" content="cdn viewer of packages." />
      <meta property="og:site_name" content="cdn.unix.bio" />
      <meta property="og:description" content="cdn viewer of packages." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="author" content="witt" />
      <meta name="twitter:creator" content="@echo_witt" />
      <meta property="og:title" content="cdn viewer of packages." />
      <meta property="og:url" content="//cdn.unix.bio" />
      <meta property="og:image" content="https://user-images.githubusercontent.com/11304944/77593854-eedf9e80-6f2f-11ea-8ec6-a76cebc2b060.jpg" />
      <meta property="twitter:image" content="https://user-images.githubusercontent.com/11304944/77593854-eedf9e80-6f2f-11ea-8ec6-a76cebc2b060.jpg" />
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover" />
    </Head>
    <ZEITUIProvider>
      <CSSBaseline>
        <Component {...pageProps} />
      </CSSBaseline>
      <style global jsx>{`
        .tag {
          color: ${theme.palette.accents_5};
        }
        
        .punctuation {
          color: ${theme.palette.accents_5};
        }
        
        .attr-name {
          color: ${theme.palette.accents_6};
        }
        
        .attr-value {
          color: ${theme.palette.accents_4};
        }
        
        .language-javascript {
          color: ${theme.palette.accents_4};
        }
        
        span[class*="class-name"] {
          color: ${theme.palette.purple};
        }
        
        span.token.string {
          color: ${theme.palette.accents_5};
        }
        
        span.keyword {
          color: ${theme.palette.success}
        }
        
        span.plain-text {
          color: ${theme.palette.accents_3};
        }
        
        html, body {
          overflow-x: hidden;
        }
        
        @media only screen and (max-width: 767px) {
          html {
            font-size: 15px;
          }
        }
      `}</style>
    </ZEITUIProvider>
    </>
  )
}

export default Application
