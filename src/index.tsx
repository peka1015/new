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

// JSX = JavaScript Extended:
// Praesentationslogik in JS wird ergaenzt um die Anzeige in React

// TSX = TypeScript Extended:
// Praesentationslogik in TS wird ergaenzt um die Anzeige in React

import * as React from 'react'
import { render } from 'react-dom'
import { addLocaleData, IntlProvider } from 'react-intl'
import * as de from 'react-intl/locale-data/de'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

console.info(`React Version: ${React.version}`)

addLocaleData([...de])

// Strict Mode:
// https://medium.com/@baphemot/whats-new-in-react-16-3-d2c9b7b6193b
// https://github.com/ReactTraining/react-router/issues/6060
render(
    <IntlProvider locale="de">
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </IntlProvider>,

    // siehe index.html
    document.getElementById('root') as HTMLElement,
)
