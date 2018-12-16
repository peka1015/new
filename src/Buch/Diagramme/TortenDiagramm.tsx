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
import { Pie } from 'react-chartjs-2'

import { useTitle } from '../../shared/hooks'

import { findAll } from '../shared/buch-service'

export default function TortenDiagramm() {
    useTitle('TortenDiagramm')
    return <Pie data={createData()} width={300} height={150} />
}

function createData() {
    const buecher = findAll()

    const labels = buecher.map(buch => buch.id)

    const label = 'Bewertung'
    const data = buecher.map(buch => buch.rating)

    const { length } = data
    const backgroundColor = new Array<string>(length)
    const hoverBackgroundColor = new Array<string>(length)
    for (let i = 0; i < length; i++) {
        const { color, hover } = getColorHover(i)
        backgroundColor[i] = color
        hoverBackgroundColor[i] = hover
    }

    const datasets = [{ label, data, backgroundColor, hoverBackgroundColor }]
    return { labels, datasets }
}

interface ColorHover {
    color: string
    hover: string
}

const colorMap = new Map<number, ColorHover>()
colorMap.set(0, { color: '#F7464A', hover: '#FF5A5E' }) // rot
colorMap.set(1, { color: '#46BFBD', hover: '#5AD3D1' }) // gruen
colorMap.set(2, { color: '#FDB45C', hover: '#FFC870' }) // gelb

function getColorHover(idx: number) {
    return colorMap.get(idx % 3) as ColorHover
}
