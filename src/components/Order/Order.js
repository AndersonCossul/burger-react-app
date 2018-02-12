import React from 'react'
import classes from './Order.css'

const order = (props) => {
  const ingredients = []

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }

  const ingredientsOutput = ingredients.map(ingredient => {
    return <span
      className={classes.Box}
      key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD: {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  )
}

export default order
