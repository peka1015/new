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

import Buch from '../../shared/buch'

import Zeile from './Zeile'

export default function TableBuecher(props: { values: Array<Buch> }) {
    const { values } = props
    return (
        <table className="table table-striped table-hover table-responsive">
            <TableHeader />
            <TableBody buecher={values} />
        </table>
    )
}

function TableHeader() {
    return (
        <thead className="thead-default">
            <tr>
                <th>ID</th>
                <th>Titel</th>
                <th>Verlag</th>
                <th>Schlagw&ouml;rter</th>
                <th>
                    <span className="sr-only">Spalte f&uuml;r Details</span>
                </th>
            </tr>
        </thead>
    )
}

// Keys in Listen
// https://facebook.github.io/react/docs/lists-and-keys.html
function TableBody(props: { buecher: Array<Buch> }) {
    const { buecher } = props
    return (
        <tbody>
            {buecher.map(buch => (
                <Zeile key={`${buch.id}zeile`} buch={buch} />
            ))}
        </tbody>
    )
}
