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

// @ts-ignore d.ts fuer React ist fuer React 16.4
const { useEffect } = React

export function useTitle(title: string) {
    // Seiteneffekt: Titel aendern (in React < 16.7: componentDidMount)
    // https://reactjs.org/docs/hooks-effect.html
    useEffect(
        () => {
            document.title = title
        },
        // Pufferung, falls weitere useEffect-Aufrufe mit jeweiligen Input-Daten
        [title],
    )
}
