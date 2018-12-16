/*
 * Copyright (C) 2017- present Juergen Zimmermann, Hochschule Karlsruhe
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

import GefundeneBuecher from './GefundeneBuecher'
import KeineBuecherGefunden from './KeineBuecherGefunden'

// Props bzw. Properties, um Daten an die Kindkomponenten zu uebergeben,
// d.h. Props sind die Initialwerte der Kindkomponenten

export default function Suchergebnis(props: {
    init: boolean
    gefundeneBuecher: Array<Buch>
}) {
    const { init, gefundeneBuecher } = props
    return init ? (
        <div />
    ) : gefundeneBuecher.length === 0 ? (
        <KeineBuecherGefunden />
    ) : (
        <GefundeneBuecher values={gefundeneBuecher} />
    )
}
