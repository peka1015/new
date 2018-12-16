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

import ErrorMsg from '../../shared/ErrorMsg'
import { OnChangeFn } from '../../shared/types'

import ValidationMsg from './ValidationMsg'

export default function Titel(props: {
    value: string
    onChange: OnChangeFn
    validationMsg: ValidationMsg
    onChangeValidationMsg: (msg: ValidationMsg) => void
}) {
    const { value, onChange, validationMsg, onChangeValidationMsg } = props

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const titel = event.target.value
        onChange(titel)

        // Anstatt bei jeder Aenderung zu validieren,
        // kann man auch bei onBlur validieren, d.h. in einer 2. Funktion.
        const valid = titel.length >= 2 && titel.match(/^([\w.]*)$/) !== null
        validationMsg.titelMsg = valid
            ? ''
            : 'Ein Buchtitel muss mit einem Buchstaben oder einer Ziffer ' +
              'beginnen und mindestens 2 Zeichen lang sein.'
        onChangeValidationMsg(validationMsg)
    }

    return (
        <div className="form-group row">
            <label className="col col-2 form-control-label">Titel *</label>
            <div className="col col-10">
                <input
                    value={value}
                    onChange={handleChange}
                    placeholder="Titel"
                    className="form-control"
                    required={false}
                    name="titel"
                />
                <ErrorMsg msg={validationMsg.titelMsg} />
            </div>
        </div>
    )
}
