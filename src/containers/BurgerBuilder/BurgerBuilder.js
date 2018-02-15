import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Auxi from '../../hoc/Auxi/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

class BurgerBuilder extends Component {
	state = {
		purchasing: false, // order button was clicked and modal should be open
		loading: false, // controls the spinner
		error: null
	}

	componentDidMount = () => {
		// axios.get('/ingredients.json')
		// 	.then(response => {
		// 		this.setState({ingredients: response.data})
		// 	})
		// 	.catch(error => {
		// 		this.setState({error: <p>Ingredients can't be loaded</p>})
		// 	})
	}

	updatePurchaseState () {
		const sum = Object.keys(this.props.ingredients)
			.map(ingredientKey => {
				return this.props.ingredients[ingredientKey]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)
		return sum > 0
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout')
	}

	render () {
		const disabledInfo = {
			...this.props.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		// this turns into {salad: true, meat: false, ...}

		// nothing and spinning by default
		let orderSummary = null
		let burger = this.state.error ? this.state.error : <Spinner/>

		if (this.props.ingredients) {
			burger = (
				<Auxi>
				<Burger ingredients={this.props.ingredients}/>
				<BuildControls
					ingredientAdded={this.props.onIngredientAdded}
					ingredientRemoved={this.props.onIngredientRemoved}
					disabled={disabledInfo}
					purchasable={this.updatePurchaseState()}
					price={this.props.totalPrice}
					ordered={this.purchaseHandler}/>
				</Auxi>
			)

			orderSummary = <OrderSummary
						ingredients={this.props.ingredients}
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						totalPrice={this.props.totalPrice}/>
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

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingredientName) => dispatch({type: actions.ADD_INGREDIENT, ingredientName: ingredientName}),
		onIngredientRemoved: (ingredientName) => dispatch({type: actions.REMOVE_INGREDIENT, ingredientName: ingredientName}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
