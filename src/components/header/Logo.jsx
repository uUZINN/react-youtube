import React from 'react'

import { PiCoatHangerBold } from "react-icons/pi"
import { Link } from "react-router-dom"

const Logo = () => {
	return (
		<h1 className="header__logo">
			<Link to="/">
				<em><PiCoatHangerBold /></em>
				<span>fashion<br /> youtube</span>
			</Link>
		</h1>
	)
}

export default Logo