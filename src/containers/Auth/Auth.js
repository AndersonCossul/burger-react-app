import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import classes from './Auth.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import { checkValidity } from '../../shared/formValidation'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isLoginForm: true
  }

  componentDidMount() {
    if (!this.props.isBurgerBeingBuilt && this.props.redirectWhenLoggedPath !== '/') {
      this.props.setAuthRedirectPath('/') // change the url on which to redirect after logging in
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }

    this.setState({ controls: updatedControls })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const email = this.state.controls.email.value
    const password = this.state.controls.password.value
    this.props.auth(email, password, this.state.isLoginForm)
  }

  switchAuthHandler = (event) => {
    event.preventDefault()
    this.setState(prevState => {
      return { isLoginForm: !prevState.isLoginForm }
    })
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementsArray.map(element => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
        changed={(event) => this.inputChangedHandler(event, element.id)} />
    ))

    let formControls = (
      <div>
        <Button btnType="Success">Submit</Button>
        <Button
          btnType="Danger"
          clicked={this.switchAuthHandler}>
          Switch to {this.state.isLoginForm ? 'Register' : 'Login'}
        </Button>
      </div>
    )

    let error = null

    if (this.props.error) {
      error = <p className={classes.Error}>{this.props.error.message}</p>
    }

    if (this.props.loading) {
      form = <Spinner />
      formControls = null
      error = null
    }

    let alreadyLoggedInRedirect = null
    if (this.props.isAlreadyLoggedIn) {
      alreadyLoggedInRedirect = <Redirect to={this.props.redirectWhenLoggedPath} />
    }

    return (
      <div className={classes.Auth}>
        {alreadyLoggedInRedirect}
        <h1 className={classes.Title}>
          {this.state.isLoginForm ? 'Login' : 'Register'}
        </h1>
        <form onSubmit={this.submitHandler}>
          {form}
          {formControls}
          {error}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAlreadyLoggedIn: state.auth.token !== null,
    redirectWhenLoggedPath: state.auth.redirectWhenLoggedPath,
    isBurgerBeingBuilt: state.burgerBuilder.building,
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, isLoginForm) => dispatch(actions.auth(email, password, isLoginForm)),
    setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)