import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/'
import Auxi from '../../hoc/Auxi/Auxi'
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

export class BurgerBuilder extends Component {
	state = {
		purchasing: false, // order button was clicked and modal should be open
	}

	componentDidMount() {
		this.props.onInitIngredients()
	}

	updatePurchaseState() {
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
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true }) // opens modal
		} else {
			this.props.setAuthRedirectPath('/checkout') // configure the route to go after user logges in
			this.props.history.push('/login') // redirect him to the login page
		}
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		// first dispatch init purchase so the checkout page can be accessed, otherwise a redirect back would take place
		this.props.onInitPurchase()
		this.props.history.push('/checkout')
	}

	render() {
		const disabledInfo = {
			...this.props.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		// this turns into {salad: true, meat: false, ...}

		// nothing and spinning by default
		let orderSummary = null
		let burger = this.props.error ? <p>Ingredients couldn't be fetched!</p> : <Spinner />

		if (this.props.ingredients) {
			burger = (
				<Auxi>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState()}
						price={this.props.totalPrice}
						ordered={this.purchaseHandler}
						isAuthenticated={this.props.isAuthenticated} />
				</Auxi>
			)

			orderSummary = <OrderSummary
				ingredients={this.props.ingredients}
				purchaseCanceled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				totalPrice={this.props.totalPrice} />
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
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
		onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
