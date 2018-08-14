import React, { Component } from 'react'
import { Button, Field } from '@hackclub/design-system'
import StoreContext from '../../context/StoreContext'

export default class AddToCart extends Component {
  state = {
    variant: '',
    quantity: 1,
    errors: {
      variant: '',
      quantity: ''
    }
  }

  handleChange = event => {
    // update Field values and check for errors
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.forceUpdate()
      this.handleErrors()
    })
  }

  handleErrors() {
    const errors = {}
    if (this.state.variant === '')
      errors.variant = 'Please select a size first.'
    if (this.state.quantity < 1)
      errors.quantity = 'Please choose a quantity of 1 or more.'

    this.setState({
      errors
    })

    return errors === {}
  }

  handleSubmit = callback => event => {
    if (this.handleErrors()) {
      callback(this.state.variant, this.state.quantity)
    }
  }

  render() {
    const { variants } = this.props

    return (
      <StoreContext.Consumer>
        {({ addVariantToCart }) => (
          <form onSubmit={this.handleSubmit(addVariantToCart)}>
            <Field
              name="variant"
              value={this.state.variant}
              label="Choose a size"
              onChange={this.handleChange}
              type="select"
              error={this.state.errors.variant}
            >
              <option disabled value="">
                Choose Size
              </option>
              {variants.edges.map(variant => (
                <option value={variant.node.id} key={variant.node.id}>
                  {variant.node.title}
                </option>
              ))}
            </Field>
            <Field
              name="quantity"
              value={this.state.quantity}
              label="Choose a quantity"
              onChange={this.handleChange}
              type="number"
              error={this.state.errors.quantity}
            />
            <Button onClick={this.handleSubmit(addVariantToCart)} type="submit">
              Add to Cart
            </Button>
          </form>
        )}
      </StoreContext.Consumer>
    )
  }
}
