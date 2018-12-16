/*
 * Copyright (C) 2018 - present Juergen Zimmermann
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

// https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin
import * as DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// https://github.com/nuxt/webpackbar
import * as WebpackBar from 'webpackbar'

module.exports = {
    // TODO react-router-dom und react-router ist bei "production" nicht in react.dll.js
    // mode: 'production',
    mode: 'development',

    // Fremdsoftware liegt als JavaScript-Dateien vor
    resolve: {
        extensions: ['.js'],
        alias: {
            moment: path.resolve(__dirname, 'node_modules', 'moment'),
            'prop-types': path.resolve(__dirname, 'node_modules', 'prop-types'),
        },
    },

    // Ausgangsdateien fuer die Verarbeitung mit webpack
    entry: {
        chartjs: ['./src/webpack/chartjs.ts'],
        polyfills: ['./src/webpack/polyfills.ts'],
        react: ['./src/webpack/react.ts'],
    },

    // Namen fuer Verzeichnisse und neu erstellte Dateien
    output: {
        path: path.resolve(__dirname, 'dist'),
        // chartjs.js, polyfills.js, react.js
        filename: 'js/[name].dll.js',
        library: '[name]_[hash]',
    },

    // Plugins, um Dateien zu erstellen
    plugins: [
        // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
        new webpack.DllPlugin({
            context: __dirname,
            path: path.resolve(__dirname, 'dist', 'js', '[name]-manifest.json'),
            name: '[name]_[hash]',
        }),

        // https://webpack.js.org/plugins/context-replacement-plugin
        // http://stackoverflow.com/questions/25384360/...
        // ...how-to-prevent-moment-js-from-loading-locales-with-webpack/25426019#25426019
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale/, /de\.js/),
        new webpack.BannerPlugin(
            '(C) Juergen Zimmermann, 2018: http://www.gnu.org/licenses',
        ),

        new webpack.optimize.OccurrenceOrderPlugin(true),

        new DuplicatePackageCheckerPlugin({
            verbose: true,
            // emitError: false,
        }),

        // Aufloesung von Duplikaten mit verschiedenen Versionen
        new webpack.LoaderOptionsPlugin({
            alias: {
                // node_modules\react-intl\lib\index.es.js
                // node_modules\react-router-dom\es\Link.js
                invariant: path.resolve(
                    __dirname,
                    'node_modules',
                    'react-router-dom',
                    'node_modules',
                    'invariant',
                ),
            },
        }),

        new WebpackBar(),

        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'report.dll.html',
        }),
    ],

    cache: true,
}
