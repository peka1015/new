/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
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
import { Link } from 'react-router-dom'

export default function Button({ onClick, validationMsg }) {
    return isDisabled(validationMsg) ? (
        <ButtonDisabled />
    ) : (
        <ButtonEnabled onClick={onClick} />
    )
}

function isDisabled(validationMsg) {
    const { titelMsg, preisMsg, rabattMsg, isbnMsg } = validationMsg
    return (
        titelMsg !== '' || preisMsg !== '' || rabattMsg !== '' || isbnMsg !== ''
    )
}

function ButtonDisabled() {
    return (
        <button className="offset-2 btn btn-secondary" disabled={true}>
            <i className="fas fa-check" />
            <span className="ml-1">Jetzt anlegen</span>
        </button>
    )
}

function ButtonEnabled(props: { onClick: () => void }) {
    return (
        <Link to="/">
            <button
                className="offset-2 btn btn-secondary"
                onClick={props.onClick}
            >
                <i className="fas fa-check" />
                <span className="ml-1">Jetzt anlegen</span>
            </button>
        </Link>
    )
}
