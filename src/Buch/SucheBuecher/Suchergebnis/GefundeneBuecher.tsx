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

import TableBuecher from './TableBuecher'

// Props bzw. Properties, um Daten an die Kindkomponenten zu übergeben,
// d.h. Props sind die Initialwerte der Kindkomponenten

export default function GefundeneBuecher(props: { values: Array<Buch> }) {
    const { values } = props
    return (
        <div className="card mt-2">
            <div className="card-header">
                <i className="fas fa-folder-open" />
                <span className="ml-1 font-weight-bold">Suchergebnis</span>
            </div>

            <div className="card-body">
                <TableBuecher values={values} />
            </div>
        </div>
    )
}
