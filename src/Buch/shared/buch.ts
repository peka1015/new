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
// tslint:disable:max-file-line-count

import * as moment from 'moment'
import 'moment/locale/de'

moment.locale('de')

const MIN_RATING = 0
const MAX_RATING = 5

export declare type Verlag = 'IWI_VERLAG' | 'HSKA_VERLAG'
export declare type BuchArt = 'KINDLE' | 'DRUCKAUSGABE'

// ISBN-13: 123-4-56789-012-3
// ISBN-10:     1-23456-789-0
type ISBN = string

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Buchdaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 */
export interface BuchShared {
    id?: string
    titel?: string
    verlag?: Verlag | ''
    art?: BuchArt
    lieferbar?: boolean
    isbn?: ISBN
}

/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface BuchServer extends BuchShared {
    rating?: number
    preis?: number
    rabatt?: number
    datum?: string
    schlagwoerter?: Array<string>
}

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
export interface BuchForm extends BuchShared {
    rating: string | undefined
    preis: string | undefined
    rabatt: string | undefined
    datum: string | undefined
    javascript: boolean
    typescript: boolean
}

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export default class Buch implements BuchShared {
    ratingArray: Array<boolean> = []

    // wird nur von fromServer() und fromForm() aufgerufen
    private constructor(
        // tslint:disable-next-line:variable-name
        public id: string | undefined,
        public titel: string | undefined,
        public rating: number | undefined,
        public art: BuchArt | undefined,
        public verlag: Verlag | '' | undefined,
        public datum: moment.Moment | undefined,
        public preis: number | undefined,
        public rabatt: number | undefined,
        public lieferbar: boolean | undefined,
        public schlagwoerter: Array<string> | undefined,
        public isbn: ISBN | undefined,
    ) {
        this.id = id || undefined
        this.titel = titel || undefined
        this.rating = rating || undefined
        this.art = art || undefined
        this.verlag = verlag || undefined
        this.datum =
            datum === undefined ? moment(new Date().toISOString()) : datum
        this.preis = preis || undefined
        this.rabatt = rabatt || undefined
        this.lieferbar = lieferbar || undefined

        this.schlagwoerter = schlagwoerter === undefined ? [] : schlagwoerter

        if (rating !== undefined) {
            this.ratingArray = Array(rating - MIN_RATING)
                .fill(true)
                .concat(Array(MAX_RATING - rating).fill(false))
        }
        this.isbn = isbn || undefined
    }

    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
     * Service kommen.
     * @param buchServer JSON-Objekt mit Daten vom RESTful Web Server
     * @return Das initialisierte Buch-Objekt
     */
    static fromServer(buchServer: BuchServer) {
        let datum: moment.Moment | undefined
        if (buchServer.datum !== undefined) {
            const tmp = buchServer.datum
            datum = moment(tmp)
        }
        const buch = new Buch(
            buchServer.id,
            buchServer.titel,
            buchServer.rating,
            buchServer.art,
            buchServer.verlag,
            datum,
            buchServer.preis,
            buchServer.rabatt,
            buchServer.lieferbar,
            buchServer.schlagwoerter,
            buchServer.isbn,
        )
        console.log('Buch.fromServer(): buch=', buch)
        return buch
    }

    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param buchForm JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Buch-Objekt
     */
    static fromForm(buchForm: BuchForm) {
        const schlagwoerter: Array<string> = []
        if (buchForm.javascript) {
            schlagwoerter.push('JAVASCRIPT')
        }
        if (buchForm.typescript) {
            schlagwoerter.push('TYPESCRIPT')
        }

        const datumMoment: moment.Moment | undefined =
            buchForm.datum === undefined ? undefined : moment(buchForm.datum)

        const rating = buchForm.rating === undefined ? 0 : +buchForm.rating
        const rabatt =
            buchForm.rabatt === undefined
                ? 0
                : Number.parseFloat(buchForm.rabatt) / 100
        const buch = new Buch(
            buchForm.id,
            buchForm.titel,
            rating,
            buchForm.art,
            buchForm.verlag,
            datumMoment,
            Number.parseInt(buchForm.preis as string, 10),
            rabatt,
            buchForm.lieferbar,
            schlagwoerter,
            buchForm.isbn,
        )
        console.log('Buch.fromForm(): buch=', buch)
        return buch
    }

    // http://momentjs.com
    get datumFormatted(): string | undefined {
        if (this.isBlank(this.datum)) {
            return undefined
        }
        const datum: moment.Moment = this.datum as moment.Moment
        return datum.format('Do MMM YYYY')
    }

    get datumFromNow(): string | undefined {
        if (this.isBlank(this.datum)) {
            return undefined
        }
        const datum: moment.Moment = this.datum as moment.Moment
        return datum.fromNow()
    }

    /**
     * Abfrage, ob im Buchtitel der angegebene Teilstring enthalten ist. Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param titel Zu &uuml;berpr&uuml;fender Teilstring
     * @return true, falls der Teilstring im Buchtitel enthalten ist. Sonst
     *         false.
     */
    containsTitel(titel: string) {
        if (this.titel === undefined) {
            return false
        }
        const tmp: string = this.titel
        return tmp.toLowerCase().includes(titel.toLowerCase())
    }

    /**
     * Die Bewertung ("rating") des Buches um 1 erh&ouml;hen
     */
    rateUp() {
        if (this.rating !== undefined && this.rating < MAX_RATING) {
            this.rating++
        }
    }

    /**
     * Die Bewertung ("rating") des Buches um 1 erniedrigen
     */
    rateDown() {
        if (this.rating !== undefined && this.rating > MIN_RATING) {
            this.rating--
        }
    }

    /**
     * Abfrage, ob das Buch dem angegebenen Verlag zugeordnet ist.
     * @param verlag der Name des Verlags
     * @return true, falls das Buch dem Verlag zugeordnet ist. Sonst false.
     */
    hasVerlag(verlag: string) {
        return this.verlag === verlag
    }

    hasArt(art: string) {
        return this.art === art
    }

    /**
     * Aktualisierung der Stammdaten des Buch-Objekts.
     * @param titel Der neue Buchtitel
     * @param rating Die neue Bewertung
     * @param art Die neue Buchart (DRUCKAUSGABE oder KINDLE)
     * @param verlag Der neue Verlag
     * @param preis Der neue Preis
     * @param rabatt Der neue Rabatt
     */
    updateStammdaten(
        titel: string,
        art: BuchArt,
        verlag: Verlag,
        rating: number,
        datum: moment.Moment | undefined,
        preis: number | undefined,
        rabatt: number | undefined,
    ) {
        this.titel = titel
        this.art = art
        this.verlag = verlag
        this.rating = rating
        this.ratingArray = Array(rating - MIN_RATING).fill(true)
        this.datum = datum
        this.preis = preis
        this.rabatt = rabatt
    }

    /**
     * Abfrage, ob es zum Buch auch Schlagw&ouml;rter gibt.
     * @return true, falls es mindestens ein Schlagwort gibt. Sonst false.
     */
    hasSchlagwoerter() {
        if (this.isBlank(this.schlagwoerter)) {
            return false
        }
        const schlagwoerter = this.schlagwoerter as Array<string>
        return schlagwoerter.length !== 0
    }

    /**
     * Abfrage, ob es zum Buch das angegebene Schlagwort gibt.
     * @param schlagwort das zu &uuml;berpr&uuml;fende Schlagwort
     * @return true, falls es das Schlagwort gibt. Sonst false.
     */
    hasSchlagwort(schlagwort: string) {
        if (this.isBlank(this.schlagwoerter)) {
            return false
        }
        const schlagwoerter = this.schlagwoerter as Array<string>
        return schlagwoerter.includes(schlagwort)
    }

    /**
     * Aktualisierung der Schlagw&ouml;rter des Buch-Objekts.
     * @param javascript ist das Schlagwort JAVASCRIPT gesetzt
     * @param typescript ist das Schlagwort TYPESCRIPT gesetzt
     */
    updateSchlagwoerter(javascript: boolean, typescript: boolean) {
        this.resetSchlagwoerter()
        if (javascript) {
            this.addSchlagwort('JAVASCRIPT')
        }
        if (typescript) {
            this.addSchlagwort('TYPESCRIPT')
        }
    }

    /**
     * Konvertierung des Buchobjektes in ein JSON-Objekt f&uuml;r den RESTful
     * Web Service.
     * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
     */
    toJSON(): BuchServer {
        let datum: string | undefined
        if (this.datum !== undefined) {
            const tmp = this.datum
            datum = tmp.format('YYYY-MM-DD')
        }
        return {
            id: this.id,
            titel: this.titel,
            rating: this.rating,
            art: this.art,
            verlag: this.verlag,
            datum,
            preis: this.preis,
            rabatt: this.rabatt,
            lieferbar: this.lieferbar,
            schlagwoerter: this.schlagwoerter,
            isbn: this.isbn,
        }
    }

    toString() {
        return JSON.stringify(this, null, 2)
    }

    private resetSchlagwoerter() {
        this.schlagwoerter = []
    }

    private addSchlagwort(schlagwort: string) {
        if (this.isBlank(this.schlagwoerter)) {
            this.schlagwoerter = []
        }
        const schlagwoerter = this.schlagwoerter as Array<string>
        schlagwoerter.push(schlagwort)
    }

    private isBlank(obj: any) {
        return obj === undefined || obj === null
    }
}
