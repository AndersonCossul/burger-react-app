import React from 'react'
import classes from './DrawerToggle.css'

const menu = (props) => (
	<div
		className={classes.DrawerToggle}
		onClick={props.clicked}>
		<hr/>
		<hr/>
		<hr/>
	</div>
)

export default menu