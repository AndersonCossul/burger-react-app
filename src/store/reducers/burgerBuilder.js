import * as actions from '../actions/actions'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_INGREDIENTS:
      return setIngredients(state, action)
    case actions.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action)
    case actions.ADD_INGREDIENT:
      return addIngredient(state, action)
    case actions.REMOVE_INGREDIENT:
      return removeIngredient(state, action)
    case actions.RESET_BURGER:
      return resetBurger(state)
    default:
      return state
  }
}

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      // manually setting one by one here to prevent the order
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    error: false,
    building: false,
    totalPrice: 4
  }
}

const fetchIngredientsFailed = (state, action) => {
  return {
    ...state,
    error: true
  }
}

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
}

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
}

const resetBurger = state => {
  return {
    ...state,
    ingredients: null,
    totalPrice: 4
  }
}

export default reducer