import React from "react";
import Head from "next/head";
import * as Markdown from "react-markdown";

import Link from "../../components/Link";
import content from "../../util/content";

export default class extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    const post = await content.getPost(slug);
    return { post };
  }

  render() {
    if (!this.props.post) {
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
          <title>{this.props.post.fields.title}</title>
        </Head>
        <Link href="/">Home</Link>
        <h1>{this.props.post.fields.title}</h1>
        <Markdown source={this.props.post.fields.body} className="post" />
      </div>
    );
  }
}
