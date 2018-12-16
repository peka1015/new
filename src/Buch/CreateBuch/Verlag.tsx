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

import { OnChangeFn } from '../../shared/types'

export default function Verlag(props: { value: string; onChange: OnChangeFn }) {
    const { value, onChange } = props

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onChange(event.target.value)
    }

    return (
        <div className="form-group row">
            <label className="col col-2 form-control-label">Verlag *</label>
            <div className="col col-10">
                <select
                    className="form-control"
                    required={true}
                    value={value}
                    onChange={handleChange}
                    name="verlag"
                >
                    <option value="">Einen Verlag ausw&auml;hlen</option>
                    <option value="IWI_VERLAG">IWI Verlag</option>
                    <option value="HSKA_VERLAG">HsKa Verlag</option>
                </select>
            </div>
        </div>
    )
}
