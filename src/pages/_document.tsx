import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx);

  //   return initialProps;
  // }

  render() {
    return (
      <Html>
        <Head />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
          rel="stylesheet"
        />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
