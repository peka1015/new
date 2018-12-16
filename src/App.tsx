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

// .tsx ist Spracherweiterung zu TypeScript
// analog: .jsx als Spracherweiterung zu JavaScript

import * as React from 'react'

import Header from './Layout/Header/Header'
import Main from './Layout/Main'

import './img/gradientBlueSky.png'
import './img/hs-logo.gif'

// Komponenten sind Bausteine einer Webanwendung.
// In einer Komponente wird das UI (= Weboberflaeche) deklariert.
// Dabei werden ggf. (Zustands-) werte beruecksichtigt.

// <React.Fragment> vermeidet ein kuenstliches <div>
// <> ist die Kurzform fuer <React.Fragment>
export default function App() {
    return (
        <>
            <Header />
            <Main />
        </>
    )
}
