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
import { Suchkriterien } from '../../shared/buch-service'

import Art from './Art'
import HinweisAlleBuecher from './HinweisAlleBuecher'
import Schlagwoerter from './Schlagwoerter/Schlagwoerter'
import SucheButton from './SucheButton'
import Titel from './Titel'
import Verlag from './Verlag'

// @ts-ignore d.ts fuer React ist fuer React 16.4
const { useState } = React

// Props bzw. Properties, um Daten an die Kindkomponenten zu übergeben,
// d.h. Props sind die Initialwerte der Kindkomponenten

export default function Suchformular(props: {
    onFind: (buecher: Array<Buch>) => void
}) {
    const [titel, setTitel] = useState(undefined)
    const [verlag, setVerlag] = useState(undefined)
    const [art, setArt] = useState(undefined)
    const [javascript, setJavascript] = useState(false)
    const [typescript, setTypescript] = useState(false)

    const suchkriterien: Suchkriterien = {
        titel,
        verlag,
        art,
        javascript,
        typescript,
    }

    return (
        <div className="card">
            <div className="card-header">
                <i className="fas fa-search" />
                <span className="ml-1 font-weight-bold">
                    Suche nach einem Buch
                </span>
            </div>
            <div className="card-body">
                <form role="form">
                    <Titel value={titel} onChange={setTitel} />
                    <Verlag value={verlag} onChange={setVerlag} />
                    <Art value={art} onChange={setArt} />
                    <Schlagwoerter
                        checkedJavascript={javascript}
                        onChangeJavascript={setJavascript}
                        checkedTypescript={typescript}
                        onChangeTypescript={setTypescript}
                    />
                    <HinweisAlleBuecher />
                    <SucheButton
                        suchkriterien={suchkriterien}
                        onClick={props.onFind}
                    />
                </form>
            </div>
        </div>
    )
}
