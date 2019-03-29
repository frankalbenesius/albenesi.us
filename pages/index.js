import React from "react";
import Head from "next/head";
import * as Markdown from "react-markdown";
import format from "date-fns/format";
import compareDesc from "date-fns/compare_desc";
import getYear from "date-fns/get_year";

import content from "../util/content";
import palette from "../util/palette";
import Block from "../components/Block";
import Link from "../components/Link";

const byRecency = (a, b) => compareDesc(a.fields.date, b.fields.date);
const byPriority = (a, b) => {
  const pA = a.fields.priority || 0;
  const pB = b.fields.priority || 0;
  return pB - pA;
};

export default class extends React.Component {
  static async getInitialProps() {
    const posts = await content.getPosts();
    const projects = await content.getProjects();
    return { posts, projects };
  }

  render() {
    const { posts, projects } = this.props;
    return (
      <div>
        <div className="flex">
          <div className="left">
            <Block header="About">
              Hi! I'm Frank Albenesius. I make web applications, bake bagels,
              play D&D, and create generative art.
            </Block>
          </div>
          <div className="right">
            <img src="/static/me.jpg" />
          </div>
        </div>
        <Block header="Links">
          <Link href="https://github.com/frankalbenesius">Github</Link>&ensp;
          <Link href="https://instagram.com/frankalbenesius">
            Instagram
          </Link>&ensp;
          <Link href="https://twitter.com/frankalbenesius">Twitter</Link>&ensp;
          <Link href="https://twitch.tv/frankdotdev">Twitch</Link>&ensp;
          <Link href="mailto:frankalbenesius@gmail.com">Email</Link>
        </Block>
        <Block header="Projects">
          {projects.sort(byPriority).map(project => (
            <div key={project.sys.id} className="project">
              <Link href={project.fields.url}>{project.fields.title}</Link>
              {project.fields.github ? (
                <span className="github-link">
                  <Link href={project.fields.github}>(repo)</Link>
                </span>
              ) : null}
              <div>{project.fields.description}</div>
            </div>
          ))}
        </Block>
        <Block header="Journal">
          {posts.sort(byRecency).map((post, i) => (
            <div key={post.sys.id}>
              {format(post.fields.date, "MM/DD/YY")}
              &emsp;
              <Link
                href={`/post?slug=${post.fields.slug}`}
                as={`/post/${post.fields.slug}`}
              >
                {post.fields.title}
              </Link>
            </div>
          ))}
        </Block>
        <style jsx>{`
          .project {
            margin-bottom: 0.5rem;
          }
          .flex {
            display: flex;
          }
          .left {
            flex: 1 1 auto;
            padding-right: 2rem;
          }
          .right {
            flex: 0 0 100px;
          }
          .github-link {
            margin-left: 0.5rem;
            font-size: 0.8em;
          }
        `}</style>
      </div>
    );
  }
}
