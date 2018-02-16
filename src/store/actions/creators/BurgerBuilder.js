import * as actions from '../actions'
import axios from '../../../axios-orders'

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
			.then(response => {
				dispatch(setIngredients(response.data))
			})
			.catch(error => {
				dispatch(fetchIngredientsFailed())
			})
  }
}

const setIngredients = (ingredients) => {
  return {
    type: actions.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actions.FETCH_INGREDIENTS_FAILED
  }
}

export const addIngredient = (ingredientName) => {
  return {
    type: actions.ADD_INGREDIENT,
    ingredientName: ingredientName
  }
}

export const removeIngredient = (name) => {
  return {
    type: actions.REMOVE_INGREDIENT,
    ingredientName: name
  }
}