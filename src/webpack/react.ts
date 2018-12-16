/*
 * Copyright (C) 2017 - present Juergen Zimmermann
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

// fuer Webpack und Dll-Plugin

// TODO react-router-dom und react-router ist bei "production" nicht in react.dll.js
import 'react-router-dom'

import 'react-dom'

import 'react-intl/lib/index.es'
import 'react-intl/locale-data/de'

import 'style-loader/lib/addStyles'
import 'style-loader/lib/urls'

import 'css-loader/lib/css-base'
