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

import { OnChangeFn } from '../../../shared/types'

export default function Titel(props: { value: string; onChange: OnChangeFn }) {
    const { value, onChange } = props

    // https://reactjs.org/docs/events.html#supported-events
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value)
    }

    return (
        <div className="form-group row">
            <label
                htmlFor="titelInput"
                className="col col-2 form-control-label"
            >
                Titel
            </label>
            <div className="col col-10">
                <input
                    type="text"
                    name="titel"
                    placeholder="Den Titel oder einen Teil davon eingeben"
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
