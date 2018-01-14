import React from 'react'
import classes from './BuildControl.css'

const buildControl = (props) => (
	<div className={classes.BuildControl}>
		<label className={classes.Label}>{props.label}</label>
		<button className={classes.Less}>Less</button>
		<button className={classes.More} onClick={props.added}>More</button>
	</div>
)

export default buildControl