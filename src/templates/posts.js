import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <article className="h-entry">
        <header>
          <h1 className="p-name">{ post.frontmatter.title }</h1>
        </header>
        <div className="e-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer>
          Published <Link to={ `/${post.fields.date}/${post.fields.slug}` } className="u-url u-uid"><time className="dt-published" datetime="{ post.frontmatter.created }">{ post.frontmatter.created }</time></Link>
        </footer>
      </article>
    </Layout>
  );
};

export const query = graphql`query PostQuery($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
      created
    }
    fields {
      slug,
      date
    }
  }
}`;
