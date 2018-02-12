import React, { Component } from 'react'
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = () => {
    // toggle loading spinner
		this.setState({ loading: true })

		// firebase
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price, // in a real app, would probably make the server calculate the price, just in case
			// forced for now
			customer: {
				name: 'Anderson Cossul',
				address: {
					street: 'Confidential',
					zipCode: '555555',
					city: 'Porto Alegre',
					country: 'Brazil'
				},
				email: 'anderson_cossul@hotmail.com'
			},
			deliverMethod: 'fastest'
		}
		axios.post('/orders.json', order)
			.then((response) => {
        this.props.history.push('/')
      })
			.catch((error) => this.setState({loading: false}))
  }

  render () {
    let form = (
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
      </form>
    )

    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
