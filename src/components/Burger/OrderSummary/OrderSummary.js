import React from 'react'
import Auxi from '../../../hoc/Auxi/Auxi'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients)
		.map(ingredientKey => {
			return (
				<li key={ingredientKey}>
					<span
						style={{textTransform: 'capitalize'}}>
						{ingredientKey}
					</span>: 
					{props.ingredients[ingredientKey]}
				</li>
			)
		})

	return (
		<Auxi>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
			<p>Continue to Checkout?</p>
			<Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
		</Auxi>
	)
}

export default orderSummary