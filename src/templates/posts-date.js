import React from "react"
import { graphql, Link } from 'gatsby'
import postCollection from '../utils/post-collection';

import Layout from "../components/layout"

export default function IndexPage({data}) {
  const days = postCollection(data.allMarkdownRemark.edges);

  return (
    <Layout>
      {days.map(day => {
        return (
          <div key={ day.date }>
            <h2><Link to={ `/${day.date}` } className="u-url u-uid">{ day.title }</Link></h2>
            <div>{day.notes.map(post => {
              return (
                <article className="h-entry" key={ `${post.fields.date}/${post.fields.slug}` }>
                  <div className="p-name e-content" dangerouslySetInnerHTML={{ __html: post.html }} />
                  <div className="text-xs">
                    Published <Link to={ `/${post.fields.date}/${post.fields.slug}` } className="u-url u-uid"><time className="dt-published" datetime="{ post.frontmatter.created }">{ post.frontmatter.created }</time></Link>
                  </div>
                </article>
              );
            })}</div>
            <div>{day.articles.map(post => {
              return (
                <article className="h-entry" key={ `${post.fields.date}/${post.fields.slug}` }>
                  <header>
                    <h3 className="p-name"><Link to={ `/${post.fields.date}/${post.fields.slug}` } rel="bookmark">{post.frontmatter.title}</Link></h3>
                  </header>
                  <div className="e-content" dangerouslySetInnerHTML={{ __html: post.html }} />
                  <footer>
                    Published <Link to={ `/${post.fields.date}/${post.fields.slug}` } className="u-url u-uid"><time className="dt-published" datetime="{ post.frontmatter.created }">{ post.frontmatter.created }</time></Link>
                  </footer>
                </article>
              );
            })}</div>
          </div>
        );
      })}
    </Layout>
  );
}

export const query = graphql`query DayPostsQuery($date: Date!) {
  allMarkdownRemark(
    filter: { fields: { sourceInstanceName: { eq: "posts" }, date: { eq: $date } } },
    sort: {fields: [frontmatter___created], order: DESC}
  ) {
    edges {
      node {
        frontmatter {
          title
          created
        }
        fields {
          slug,
          date
        }
        id
        html
      }
    }
  }
}`
