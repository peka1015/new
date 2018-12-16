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
import { Route, Switch } from 'react-router-dom'

import CreateBuch from './Buch/CreateBuch/CreateBuch'
import DetailsBuch from './Buch/DetailsBuch/DetailsBuch'
import BalkenDiagramm from './Buch/Diagramme/BalkenDiagramm'
import LinienDiagramm from './Buch/Diagramme/LinienDiagramm'
import TortenDiagramm from './Buch/Diagramme/TortenDiagramm'
import SucheBuecher from './Buch/SucheBuecher/SucheBuecher'
import Home from './Home/Home'
import NotFound from './Layout/NotFound'

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md
// render= statt component=, wenn Properties uebergeben werden

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/suche" exact={true} component={SucheBuecher} />
            <Route path="/details/:id" exact={true} component={DetailsBuch} />
            <Route path="/neues-buch" exact={true} component={CreateBuch} />
            <Route
                path="/balkendiagramm"
                exact={true}
                component={BalkenDiagramm}
            />
            <Route
                path="/liniendiagramm"
                exact={true}
                component={LinienDiagramm}
            />
            <Route
                path="/tortendiagramm"
                exact={true}
                component={TortenDiagramm}
            />
            <Route component={NotFound} />
        </Switch>
    )
}
