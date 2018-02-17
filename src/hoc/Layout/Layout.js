import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Auxi from '../Auxi/Auxi'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false })
	}

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer }
		})
	}

	render() {
		return (
			<Auxi>
				<Toolbar
					drawerToggleClicked={this.sideDrawerToggleHandler}
					isAuthenticated={this.props.isAuthenticated} />
				<SideDrawer
					show={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
					isAuthenticated={this.props.isAuthenticated} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Auxi>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default withRouter(connect(mapStateToProps)(Layout))