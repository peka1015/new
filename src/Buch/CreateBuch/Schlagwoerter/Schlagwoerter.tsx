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

import { OnChangeCheckedFn } from '../../../shared/types'

import JavaScript from './JavaScript'
import TypeScript from './TypeScript'

export default function Schlagwoerter(props: {
    checkedJavascript: boolean
    onChangeJavascript: OnChangeCheckedFn
    checkedTypescript: boolean
    onChangeTypescript: OnChangeCheckedFn
}) {
    const {
        checkedJavascript,
        onChangeJavascript,
        checkedTypescript,
        onChangeTypescript,
    } = props

    return (
        <div className="form-group row">
            <label className="col col-2 form-control-label">
                Schlagw&ouml;rter
            </label>
            <div className="col col-10">
                <JavaScript
                    checked={checkedJavascript}
                    onChange={onChangeJavascript}
                />
                <TypeScript
                    checked={checkedTypescript}
                    onChange={onChangeTypescript}
                />
            </div>
        </div>
    )
}
