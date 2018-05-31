import Document, { Head, Main, NextScript } from "next/document";
import Link from "next/link";
import palette from "../util/palette";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Gentium+Book+Basic"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx global>{`
          body {
            border-top: 0.25rem solid ${palette.black};
            font-family: "Gentium Book Basic", serif;
            padding: 1rem;
            max-width: 25rem;
            margin: 0 auto;
            color: ${palette.black};
            background: ${palette.white};
          }
          * {
            box-sizing: border-box;
          }
          img {
            max-width: 100%;
          }
          a {
            color: ${palette.blue[5]};
          }
          code {
            white-space: nowrap;
            padding: 0 0.1rem;
          }
        `}</style>
      </html>
    );
  }
}
