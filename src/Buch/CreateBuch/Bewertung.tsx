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

export default function Bewertung(props: {
    value: string
    onChange: OnChangeFn
}) {
    const { value, onChange } = props
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onChange(event.target.value)
    }

    return (
        <div className="form-group row">
            <label className="col col-2 form-control-label">Bewertung</label>
            <div className="col col-10">
                <select
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                    name="rating"
                >
                    <option value="">Bewertung ausw&auml;hlen</option>
                    <optgroup label="Hoch">
                        <option value="5">5</option>
                    </optgroup>
                    <optgroup label="Mittel">
                        <option value="4">4</option>
                        <option value="3">3</option>
                    </optgroup>
                    <optgroup label="Niedrig">
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </optgroup>
                </select>
            </div>
        </div>
    )
}
