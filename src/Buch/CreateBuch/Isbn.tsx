/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
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

export default function Isbn(props: {
    value: string
    onChange: OnChangeFn
    validationMsg: ValidationMsg
    onChangeValidationMsg: (msg: ValidationMsg) => void
}) {
    const { value, onChange, validationMsg, onChangeValidationMsg } = props

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const isbn = event.target.value
        onChange(isbn)

        // ISBN-13: 123-4-56789-012-3
        // ISBN-10:     1-23456-789-0
        //              1-2345-6789-0
        const valid =
            isbn.match(/^(((\d{3}-)?\d-\d{5}-\d{3})|(\d-\d{4}-\d{4}))-\d$/) !==
            null

        validationMsg.isbnMsg = valid
            ? ''
            : 'Eine gültige ISBN-Nummmer ist notwendig, z.B. 3-89722-583-2.'
        onChangeValidationMsg(validationMsg)
    }

    return (
        <div className="form-group row">
            <label className="col col-2 form-control-label">ISBN *</label>
            <div className="col col-10">
                <input
                    placeholder="ISBN, z.B. 123-4-56789-012-3 oder 3-89722-583-2"
                    className="form-control"
                    required={false}
                    value={value}
                    onChange={handleChange}
                    name="isbn"
                />
                <ErrorMsg msg={validationMsg.isbnMsg} />
            </div>
        </div>
    )
}
