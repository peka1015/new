/*
 * Copyright (C) 2017 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import * as React from 'react'

import Navigation from '../Navigation/Navigation'

import Logo from './Logo'

import './Header.css'
// import './Header.scss'

// tslint:disable:ordered-imports
import '../../img/gradientBlueSky.png'
import '../../img/hs-logo.gif'

// "Functional Component" durch eine Arrow Function:
// entspricht der render() Function einer Klassenkomponente und
// deklariert das UI bzw. die HTML-Tags, d.h. keine Funktionsaufrufe wie bei jQuery.

export default function Header() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-faded">
            <Logo />

            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <Navigation />
        </nav>
    )
}
