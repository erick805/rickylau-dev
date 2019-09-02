/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      github: file(absolutePath: { regex: "/github.png/" }) {
        childImageSharp {
          fixed(width: 25, height: 25) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      linkedin: file(absolutePath: { regex: "/linkedin.png/" }) {
        childImageSharp {
          fixed(width: 25, height: 25) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, github, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        <Image
          fixed={data.github.childImageSharp.fixed}
          alt={author}
          style={{
            minWidth: 15,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `25%`,
          }}
        />
        {"  "}
        {"GitHub: "}
        <a href={`https://github.com/rickylaufitness`}>rickylaufitness</a>
        {" | "}{" "}
        <Image
          fixed={data.linkedin.childImageSharp.fixed}
          alt={author}
          style={{
            minWidth: 15,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `25%`,
          }}
        />
        {"  "}
        {"LinkedIn: "}
        <a href={`https://www.linkedin.com/in/rickylaudev/`}>rickylaudev</a>
      </p>
    </div>
  )
}

export default Bio
