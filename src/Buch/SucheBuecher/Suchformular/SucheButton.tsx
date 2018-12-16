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

import Buch from '../../shared/buch'
import { find, Suchkriterien } from '../../shared/buch-service'

export default function SucheButton(props: {
    suchkriterien: Suchkriterien
    onClick: (buecher: Array<Buch>) => void
}) {
    const { suchkriterien, onClick } = props

    function submitForm(event: React.MouseEvent<HTMLButtonElement>) {
        // die Seite nicht neu laden, weil sonst in der Elternkomponente
        // gefundeneBuecher auf [] gesetzt wird.
        // https://facebook.github.io/react/docs/handling-events.html
        event.preventDefault()

        const buecher = find(suchkriterien)

        // Gefundene Buecher an die Elternkomponente zur weiteren Verarbeitung uebergeben
        // https://reactjs.org/docs/lifting-state-up.html
        onClick(buecher)
    }

    return (
        <div className="form-group row">
            <div className="col offset-2">
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={submitForm}
                >
                    <i className="fas fa-search" />
                    <span className="ml-1">Suchen</span>
                </button>
            </div>
        </div>
    )
}
