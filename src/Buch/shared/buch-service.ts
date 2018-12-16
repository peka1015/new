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
// tslint:disable-next-line:no-var-requires no-require-imports
const nanoid = require('nanoid')

import Buch, { BuchArt, BuchServer, Verlag } from './buch'
import BUECHER from './daten'

export function findAll() {
    // TODO Von einem Server herunterladen
    const buecher = BUECHER.map((b: BuchServer) => Buch.fromServer(b))
    console.log('findAll: buecher=', buecher)
    return buecher
}

export function findById(id: string) {
    // TODO Von einem Server herunterladen
    const buch = BUECHER.find(b => b.id === id)
    if (buch === undefined) {
        return undefined
    }
    return Buch.fromServer(buch)
}

export interface Suchkriterien {
    titel: string | undefined
    verlag: Verlag | undefined
    art: BuchArt | undefined
    javascript: boolean | undefined
    typescript: boolean | undefined
}

export function find(suchkriterien: Suchkriterien) {
    console.log('find: suchkriterien=', suchkriterien)

    // TODO Von einem Server herunterladen

    // Die Buecher anhand der Eingaben des Suchformulars filtern
    let buecher = findAll()
    const { titel, verlag, art, javascript, typescript } = suchkriterien
    if (titel !== undefined) {
        buecher = buecher.filter((buch: Buch) => buch.containsTitel(titel))
    }
    if (verlag !== undefined) {
        buecher = buecher.filter((buch: Buch) => buch.hasVerlag(verlag))
    }
    if (art !== undefined) {
        buecher = buecher.filter((buch: Buch) => buch.hasArt(art))
    }
    if (javascript) {
        buecher = buecher.filter((buch: Buch) =>
            buch.hasSchlagwort('JAVASCRIPT'),
        )
    }
    if (typescript) {
        buecher = buecher.filter((buch: Buch) =>
            buch.hasSchlagwort('TYPESCRIPT'),
        )
    }

    console.log('find: buecher=', buecher)
    return buecher
}

export function save(buch: Buch) {
    console.log('save: buch=', buch)
    // vgl. IDs bei Youtube
    buch.id = nanoid(7)
    const buchJson = buch.toJSON()

    // TODO Auf einen Server hochladen
    BUECHER.push(buchJson)

    console.log('save: BUECHER=', BUECHER)
}
