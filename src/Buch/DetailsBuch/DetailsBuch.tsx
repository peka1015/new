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
import { RouteComponentProps } from 'react-router'

import { useTitle } from '../../shared/hooks'

import { findById } from '../shared/buch-service'

import Breadcrumbs from './Breadcrumbs'
import DetailsTabelle from './DetailsTabelle'

export default function DetailsBuch(
    props: RouteComponentProps<{ id: string }>,
) {
    const { id } = props.match.params
    useTitle(`Details ${id}`)

    const buch = findById(id)
    console.log('DetailsBuch: buch=', buch)

    if (buch === undefined) {
        return (
            <div className="fas fa-exclamation-triangle text-danger">
                Es gibt kein Buch mit der ID {id}.
            </div>
        )
    }

    // <React.Fragment> vermeidet ein kuenstliches <div>
    // <> ist die Kurzform fuer <React.Fragment>
    return (
        <>
            <Breadcrumbs />

            <section className="mt-2 ht-box">
                <h4>Buch {buch.id}:</h4>
                <DetailsTabelle buch={buch} />
            </section>
        </>
    )
}
