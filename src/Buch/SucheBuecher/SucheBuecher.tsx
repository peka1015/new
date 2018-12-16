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

import { useTitle } from '../../shared/hooks'

import Buch from '../shared/buch'

import Suchergebnis from './Suchergebnis/Suchergebnis'
import Suchformular from './Suchformular/Suchformular'

// @ts-ignore d.ts fuer React ist fuer React 16.4
const { useState } = React

// Im State (= Zustand) werden die internen Werte verwaltet.
// Der State wird nur durch die Komponente selbst geaendert,
// wozu die set-Funktionen aufgerufen werden.

// Alternativen mit Klassenkomponenten, statt den State manuell zu verwalten:
// 1) mit einem Context als "Application Global State"
//    * Producer, um Daten bereitzustellen
//    * Consumer, um Daten zu empfangen bzw. zu lesen
//    https://reactjs.org/blog/2018/03/29/react-v-16-3.html#official-context-api
// 2) Redux
// 3) MobX

export default function SucheBuecher() {
    // https://reactjs.org/docs/hooks-state.html

    // noch keine Suche durchgefuehrt
    const [init, setInit] = useState(true)
    // noch keine Buecher gefunden
    const [gefundeneBuecher, setGefundeneBuecher] = useState([])

    useTitle('Suchen')

    function updateState(buecher: Array<Buch>) {
        setInit(false)
        setGefundeneBuecher(buecher)
    }

    // Deklaration des UI bzw. der HTML-Tags, keine Funktionsaufrufe wie bei jQuery.
    // https://reactjs.org/docs/hooks-state.html

    // <React.Fragment> vermeidet ein kuenstliches <div>
    // <> ist die Kurzform fuer <React.Fragment>

    // Das Suchformular als Kindkomponente erhaelt die Funktion setGefundeneBuecher
    // als Property, um das Resultat an den State der Elternkomponente zurueckzugeben.
    // https://reactjs.org/docs/lifting-state-up.html
    return (
        <>
            <section>
                <Suchformular onFind={updateState} />
            </section>

            <section>
                <Suchergebnis init={init} gefundeneBuecher={gefundeneBuecher} />
            </section>
        </>
    )
}
