import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderPurchaseReducer from './store/reducers/orderPurchase'
import orderReducer from './store/reducers/orderPurchase'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // redux devtools

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orderPurchase: orderPurchaseReducer,
  order: orderReducer
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
