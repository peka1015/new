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

import { BuchArt } from '../../shared/buch'

export default function Art(props: { value: BuchArt; onChange: OnChangeFn }) {
    const { value, onChange } = props
    return (
        <div className="form-group row">
            <label className="col col-2 form-control-label">Art</label>
            <div className="col col-10">
                <Druckausgabe value={value} onChange={onChange} />
                <Kindle value={value} onChange={onChange} />
            </div>
        </div>
    )
}

function Druckausgabe(props: { value: BuchArt; onChange: OnChangeFn }) {
    const { value, onChange } = props
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value)
    }
    return (
        <div className="radio">
            <label className="radio-inline">
                <input
                    type="radio"
                    name="art"
                    value="DRUCKAUSGABE"
                    checked={value === 'DRUCKAUSGABE'}
                    onChange={handleChange}
                />
                <span className="ml-1">Druckausgabe</span>
            </label>
        </div>
    )
}

function Kindle(props: { value: BuchArt; onChange: OnChangeFn }) {
    const { value, onChange } = props
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value)
    }
    return (
        <div className="radio">
            <label className="radio-inline">
                <input
                    type="radio"
                    name="art"
                    value="KINDLE"
                    checked={value === 'KINDLE'}
                    onChange={handleChange}
                />
                <span className="ml-1">Kindle</span>
            </label>
        </div>
    )
}
