import React, { Component } from 'react'
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'

class ContactData extends Component {
  state = {
    orderForm: {
			name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
			street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
			zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
			country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
			email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: ''
      },
      deliverMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayName: 'Fastest'
            },
            {
              value: 'cheapest',
              displayName: 'Cheapest'
            }
          ]
        },
        value: ''
      }
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

			deliverMethod: 'fastest'
		}
		axios.post('/orders.json', order)
			.then((response) => {
        this.props.history.push('/')
      })
			.catch((error) => this.setState({loading: false}))
  }

  render () {
    const formElementsArray = []
    // "key" will be the name -> name, email, street, zipCode
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={(e) => e.preventDefault()}>
        {
          formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}/>
          ))
        }
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
