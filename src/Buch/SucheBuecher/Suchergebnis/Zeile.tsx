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
import { Redirect } from 'react-router-dom'

import Buch from '../../shared/buch'

import DetailsLink from './DetailsLink'
import Schlagwoerter from './Schlagwoerter'

// @ts-ignore d.ts fuer React ist fuer React 16.4
const { useState } = React

// <Zeile buch={...} />
export default function Zeile(props: { buch: Buch }) {
    // State: wurde das Buch in dieser Zeile selektiert bzw. angeklickt?
    const [selected, setSelected] = useState(false)

    const { id, titel, verlag, schlagwoerter } = props.buch

    if (selected) {
        // oder withRouter()
        // https://tylermcginnis.com/react-router-programmatically-navigate
        return <Redirect to={`/details/${id}`} />
    }

    function select() {
        setSelected(true)
    }
    return (
        <tr onClick={select}>
            <td>{id}</td>
            <td>{titel}</td>
            <td>{verlag}</td>
            <Schlagwoerter values={schlagwoerter} id={id} />
            <DetailsLink id={id} />
        </tr>
    )
}
