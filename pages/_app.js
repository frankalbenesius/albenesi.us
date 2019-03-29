import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import palette from "../util/palette";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>frank.dev</title>
          <link rel="shortcut icon" href="static/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://fonts.googleapis.com/css?family=Gentium+Book+Basic"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
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
            max-width: 34rem;
            margin: 0 auto;
          }
          * {
            box-sizing: border-box;
          }
          img {
            max-width: 100%;
          }
          a {
            color: ${palette.blue[6]};
          }
          pre code {
            display: block;
            padding: 1em;
            border-radius: 3px;
            background: black;
            color: white;
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
      </Container>
    );
  }
}

export default MyApp;
