import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm } from '../utils/typography';

const Header = styled.div`
  margin-bottom: ${rhythm(1 / 4)};
  margin-top: ${rhythm(3 / 4)};

  h3 {
    margin: 0;
    color: #3066BE;
  }
`;

const Article = styled.article`
  margin-bottom: ${rhythm(2)};
`;

const BlogIndex = ({ data, location }) => {
  const { site: { siteMetadata: { title: siteTitle } } } = data;
  const { allMdx: { edges: posts } } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      Has mostly nothing to do with horses or stables
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        const { cover } = node.frontmatter;
        return (
          <Link style={{ boxShadow: 'none', color: 'inherit' }} to={node.fields.slug} key={node.fields.slug}>
            {cover ? <Img fluid={cover.childImageSharp.fluid} /> : null}
            <Article>
              <Header>
                <h3>{title}</h3>
                <small>{node.frontmatter.date}</small>
              </Header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </Article>
          </Link>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            cover {
              publicURL
              childImageSharp {
                fluid(maxWidth: 590) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`;
