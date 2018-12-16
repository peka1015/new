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
import { Line } from 'react-chartjs-2'

import { useTitle } from '../../shared/hooks'

import { findAll } from '../shared/buch-service'

export default function LinienDiagramm() {
    useTitle('LinienDiagramm')
    return <Line data={createData()} width={300} height={150} />
}

function createData() {
    const buecher = findAll()

    const labels = buecher.map(buch => buch.id)

    const label = 'Bewertung'
    const data = buecher.map(buch => buch.rating)
    const datasets = [{ label, data }]

    return { labels, datasets }
}
