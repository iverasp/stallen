import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
import styled from 'styled-components';

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Header = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-top: 20px;
`;

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      Has mostly nothing to do with horses or stables
      {posts.map(({ node }, index) => {
        const title = node.frontmatter.title || node.fields.slug
        const cover = node.frontmatter.cover;
        console.log('cover', cover);
        return (
          <Link style={{ boxShadow: 'none', color: 'inherit' }} to={node.fields.slug}>
            <Header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                  color: '#3066BE'
                }}
              >
                
                  {title}
              </h3>
              <small>{node.frontmatter.date}</small>
            </Header>
            {!!cover ? <Img fluid={cover.childImageSharp.fluid} /> : null}
            <Section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </Section>
          </Link>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

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
`
