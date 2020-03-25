import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CSSBaseline } from '@zeit-ui/react'
import flush from 'styled-jsx/server'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CSSBaseline.flush()
  
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
          {flush()}
        </>
      )
    }
  }
  
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
        <Main />
        <NextScript />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=UA-110371817-14`} />
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-110371817-14');
            `
          }}
        />
        </body>
      </Html>
    )
  }
}

export default MyDocument
