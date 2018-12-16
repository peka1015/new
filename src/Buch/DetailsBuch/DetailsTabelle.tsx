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

import Buch from '../shared/buch'

import Art from './Art'
import Bewertung from './Bewertung'
import Datum from './Datum'
import Isbn from './Isbn'
import Lieferbar from './Lieferbar'
import Preis from './Preis'
import Rabatt from './Rabatt'
import Schlagwoerter from './Schlagwoerter'
import Titel from './Titel'
import Verlag from './Verlag'

export default function DetailsTabelle(props: { buch: Buch }) {
    const {
        titel,
        rating,
        art,
        verlag,
        preis,
        rabatt,
        datumFormatted,
        datumFromNow,
        lieferbar,
        schlagwoerter,
        isbn,
    } = props.buch
    return (
        <table className="table table-striped table-hover table-responsive">
            <tbody>
                <Titel value={titel} />
                <Bewertung value={rating} />
                <Art value={art} />
                <Verlag value={verlag} />
                <Preis value={preis} />
                <Rabatt value={rabatt} />
                <Datum value={datumFormatted} valueFromNow={datumFromNow} />
                <Lieferbar value={lieferbar} />
                <Schlagwoerter values={schlagwoerter} />
                <Isbn value={isbn} />
            </tbody>
        </table>
    )
}
