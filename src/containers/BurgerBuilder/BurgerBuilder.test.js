import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BurgerBuilder } from './BurgerBuilder'
import Spinner from '../../components/UI/Spinner/Spinner'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({adapter: new Adapter()})

describe('<BurgerBuilder />', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
  })

  it('should show spinner by default', () => {
    expect(wrapper.find(Spinner)).toHaveLength(1)
  })

  it('should show message error if prop error was defined', () => {
    wrapper.setProps({error: true})
    expect(wrapper.contains(<p>Ingredients couldn't be fetched!</p>)).toEqual(true)
  })

  it('should render <BuildControls/> if received ingredients', () => {
    wrapper.setProps({ingredients: {salad: 0}})
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  })
})