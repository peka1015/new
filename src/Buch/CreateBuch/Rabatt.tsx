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

export default function Rabatt(props: {
    value: string
    onChange: OnChangeFn
    validationMsg: ValidationMsg
    onChangeValidationMsg: (msg: ValidationMsg) => void
}) {
    const { value, onChange, validationMsg, onChangeValidationMsg } = props

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const rabatt = event.target.value
        onChange(rabatt)

        const valid = rabatt.match(/^\d{1,2}(\.\d{1,2})?$/) !== null
        validationMsg.rabattMsg = valid
            ? ''
            : 'Ein Rabatt in Prozent muss eingegeben werden, z.B. 5.67'
        onChangeValidationMsg(validationMsg)
    }

    return (
        <div className="form-group row">
            <label className="col col-2 form-control-label">Rabatt *</label>
            <div className="col col-10">
                <div className="input-group">
                    <input
                        placeholder="Rabatt in Prozent, z.B. 5.67"
                        required={false}
                        className="form-control"
                        value={value}
                        onChange={handleChange}
                        name="rabatt"
                    />
                    <span className="input-group-addon ml-1">%</span>
                </div>
                <ErrorMsg msg={validationMsg.rabattMsg} />
            </div>
        </div>
    )
}
