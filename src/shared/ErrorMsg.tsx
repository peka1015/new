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

// msg als Input von z.B. CreateBuch: this.state.valid.titelMsg
export default function ErrorMsg({ msg }) {
    return (
        <div>
            {msg === undefined || msg.length === 0 ? (
                <span />
            ) : (
                <div className="alert alert-danger">
                    <i className="fas fa-exclamation-triangle" />
                    <span className="ml-1">{msg}</span>
                </div>
            )}
        </div>
    )
}
