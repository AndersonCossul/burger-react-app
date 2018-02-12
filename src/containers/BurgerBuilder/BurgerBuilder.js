import React, { Component } from 'react'
import Auxi from '../../hoc/Auxi/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false, // turns on the order button on true
		purchasing: false, // order button was clicked and modal should be open
		loading: false, // controls the spinner
		error: null
	}

	componentDidMount = () => {
		axios.get('/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data})
			})
			.catch(error => {
				this.setState({error: <p>Ingredients can't be loaded</p>})
			})
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
			.map(ingredientKey => {
				return ingredients[ingredientKey]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)

		this.setState({
			purchasable: sum > 0
		})
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type]
		const updatedCount = oldCount + 1
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount

		const priceAddition = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice + priceAddition

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		})

		this.updatePurchaseState(updatedIngredients)
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type]
		if (oldCount <= 0) {
			return
		}
		const updatedCount = oldCount - 1
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount

		const priceDeduction = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - priceDeduction

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		})

		this.updatePurchaseState(updatedIngredients)
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		// // toggle loading spinner
		// this.setState({ loading: true })
    //
		// // firebase
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice, // in a real app, would probably make the server calculate the price, just in case
		// 	// forced for now
		// 	customer: {
		// 		name: 'Anderson Cossul',
		// 		address: {
		// 			street: 'Confidential',
		// 			zipCode: '555555',
		// 			city: 'Porto Alegre',
		// 			country: 'Brazil'
		// 		},
		// 		email: 'anderson_cossul@hotmail.com'
		// 	},
		// 	deliverMethod: 'fastest'
		// }
		// axios.post('/orders.json', order)
		// 	.then((response) => this.setState({loading: false, purchasing: false}))
		// 	.catch((error) => this.setState({loading: false, purchasing: false}))
		const queryParams = []

		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
		}

		const queryString = queryParams.join('&')

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		})
	}

	render () {
		const disabledInfo = {
			...this.state.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		// this turns into {salad: true, meat: false, ...}

		// nothing and spinning by default
		let orderSummary = null
		let burger = this.state.error ? this.state.error : <Spinner/>

		if (this.state.ingredients) {
			burger = (
				<Auxi>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
					ingredientRemoved={this.removeIngredientHandler}
					ingredientAdded={this.addIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}/>
				</Auxi>
			)

			orderSummary = <OrderSummary
						ingredients={this.state.ingredients}
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						totalPrice={this.state.totalPrice}/>
		}

		if (this.state.loading) {
			// on submitting
			orderSummary = <Spinner/>
		}

		return (
			<Auxi>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxi>
		)
	}
}

export default withErrorHandler(BurgerBuilder, axios)
