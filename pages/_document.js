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
          <title>I am Frank.</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          html {
            border-top: 0.25rem solid ${palette.black};
            font-size: 16px;
          }
          @media (min-width: 450px) {
            html {
              font-size: 20px;
            }
          }
          body {
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
          pre code {
            display: block;
            padding: 1em;
            border-radius: 3px;
            background: ${palette.black};
            color: ${palette.white};
          }
          p code {
            color: ${palette.red[7]};
            white-space: nowrap;
            padding: 0 0.1rem;
          }
          blockquote {
            margin: 0;
            padding-left: 1em;
            border-left: 2px solid ${palette.gray[7]};
          }
        `}</style>
      </html>
    );
  }
}
