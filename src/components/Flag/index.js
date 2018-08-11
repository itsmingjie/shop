import React from 'react'
import { Link } from 'gatsby'
import { Link as A } from '@hackclub/design-system'

const Flag = A.withComponent(Link).extend.attrs({
  to: '/',
  'aria-label': 'Homepage'
})`
  background: url(/flag.svg) no-repeat;
  background-position: top center;
  flex-shrink: 0;
  width: 8rem;
  height: 3rem;
  z-index: 0;
  ${props => props.theme.mediaQueries.md} {
    width: 10rem;
    height: 4rem;
  }
`

export default Flag