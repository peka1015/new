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
import { NavLink } from 'react-router-dom'

export default function Diagramme() {
    return (
        <li className="nav-item dropdown">
            <div
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <i className="fas fa-chart-bar" />
                <span className="ml-1">Diagramme</span>
            </div>

            <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
            >
                <Balkendiagramm />
                <Liniendiagramm />
                <Tortendiagramm />
            </div>
        </li>
    )
}

function Balkendiagramm() {
    return (
        <NavLink to="/balkendiagramm" className="dropdown-item">
            <i className="fas fa-chart-bar" />
            <span className="ml-1">Balkendiagramm</span>
        </NavLink>
    )
}

function Liniendiagramm() {
    return (
        <NavLink to="/liniendiagramm" className="dropdown-item">
            <i className="fas fa-chart-line" />
            <span className="ml-1">Liniendiagramm</span>
        </NavLink>
    )
}

function Tortendiagramm() {
    return (
        <NavLink to="/tortendiagramm" className="dropdown-item">
            <i className="fas fa-chart-pie" />
            <span className="ml-1">Tortendiagramm</span>
        </NavLink>
    )
}
