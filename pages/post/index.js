import React from "react";
import Head from "next/head";
import * as Markdown from "react-markdown";
import format from "date-fns/format";

import Link from "../../components/Link";
import content from "../../util/content";

export default class extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    const post = await content.getPost(slug);
    return { post };
  }

  render() {
    const post = this.props.post;
    if (!post) {
      return (
        <div>
          <Head>
            <title>you chump!</title>
          </Head>
          hey chump, this is not a real post
        </div>
      );
    }
    return (
      <div>
        <Head>
          <title>{post.fields.title}</title>
        </Head>
        <Link href="/">Home</Link>
        <header>
          <h1>{post.fields.title}</h1>
          <time>{format(post.fields.date, "MMMM Do, YYYY")}</time>
        </header>
        <Markdown source={post.fields.body} className="post" />
        <style jsx>{`
          header {
            padding: 2em 0;
          }
        `}</style>
      </div>
    );
  }
}
