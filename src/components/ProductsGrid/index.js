import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { Container, Grid } from './style'
import ProductCard from '../ProductCard'

export default () => (
  <StaticQuery
    query={graphql`
      query {
        products: allShopifyProducts {
          edges {
            node {
              id
              title
              fields {
                image
              }
            }
          }
        }
      }
    `}
    render={({ products }) => (
      <Container>
        <Grid>
          {products.edges.map(({ node: product }) => (
            <ProductCard
              key={product.id}
              img={product.fields.image}
              name={product.title}
            />
          ))}
        </Grid>
      </Container>
    )}
  />
)
