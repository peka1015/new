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

import { useTitle } from '../../shared/hooks'

import Buch from '../shared/buch'
import { save } from '../shared/buch-service'

import Art from './Art'
import Bewertung from './Bewertung'
import Button from './Button'
import Datum from './Datum'
import Isbn from './Isbn'
import Lieferbar from './Lieferbar'
import Preis from './Preis'
import Rabatt from './Rabatt'
import Schlagwoerter from './Schlagwoerter/Schlagwoerter'
import Titel from './Titel'
import Verlag from './Verlag'

// @ts-ignore d.ts fuer React ist fuer React 16.4
const { useState } = React

export default function CreateBuch() {
    const [titel, setTitel] = useState(undefined)
    const [rating, setRating] = useState(undefined)
    const [art, setArt] = useState('DRUCKAUSGABE')
    const [verlag, setVerlag] = useState(undefined)
    const [preis, setPreis] = useState(undefined)
    const [rabatt, setRabatt] = useState(undefined)
    const [datum, setDatum] = useState(undefined)
    const [lieferbar, setLieferbar] = useState(false)
    const [javascript, setJavascript] = useState(false)
    const [typescript, setTypescript] = useState(false)
    const [isbn, setIsbn] = useState(undefined)

    const [validationMsg, setValidationMsg] = useState({
        buttonEnabled: false,
        titelMsg: undefined,
        preisMsg: undefined,
        rabattMsg: undefined,
        isbnMsg: undefined,
    })

    useTitle('Neues Buch')

    function handleSave() {
        const buchDaten = {
            titel,
            rating,
            art,
            verlag,
            preis,
            rabatt,
            datum,
            lieferbar,
            javascript,
            typescript,
            isbn,
        }
        const neuesBuch = Buch.fromForm(buchDaten)
        console.log('CreateBuch.handleSave: neuesBuch=', neuesBuch)
        save(neuesBuch)
    }

    return (
        <div className="card">
            <div className="card-header">
                <span className="ml-1 font-weight-bold">Neues Buch</span>
            </div>

            <div className="card-body">
                <form role="form">
                    <Titel
                        value={titel}
                        onChange={setTitel}
                        validationMsg={validationMsg}
                        onChangeValidationMsg={setValidationMsg}
                    />
                    <Bewertung value={rating} onChange={setRating} />
                    <Art
                        checkedDruckausgabe={art === 'DRUCKAUSGABE'}
                        checkedKindle={art === 'KINDLE'}
                        onChange={setArt}
                    />
                    <Verlag value={verlag} onChange={setVerlag} />
                    <Preis
                        value={preis}
                        onChange={setPreis}
                        validationMsg={validationMsg}
                        onChangeValidationMsg={setValidationMsg}
                    />
                    <Rabatt
                        value={rabatt}
                        onChange={setRabatt}
                        validationMsg={validationMsg}
                        onChangeValidationMsg={setValidationMsg}
                    />
                    <Datum value={datum} onChange={setDatum} />
                    <Lieferbar checked={lieferbar} onChange={setLieferbar} />
                    <Schlagwoerter
                        checkedJavascript={javascript}
                        onChangeJavascript={setJavascript}
                        checkedTypescript={typescript}
                        onChangeTypescript={setTypescript}
                    />
                    <Isbn
                        value={isbn}
                        onChange={setIsbn}
                        validationMsg={validationMsg}
                        onChangeValidationMsg={setValidationMsg}
                    />
                    <Button
                        onClick={handleSave}
                        validationMsg={validationMsg}
                    />
                </form>

                <small>* sind Pflichtfelder</small>
            </div>
        </div>
    )
}
