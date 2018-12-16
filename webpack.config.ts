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

// https://medium.com/@riittagirl/how-to-develop-react-js-apps-fast-using-webpack-4-3d772db957e4
// https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1

// https://github.com/SimenB/add-asset-html-webpack-plugin
import * as AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin'
// https://github.com/webpack-contrib/copy-webpack-plugin
// https://webpack.js.org/plugins/copy-webpack-plugin
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
// https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin
import * as DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'
import * as fs from 'fs'
// http://github.com/jantimon/html-webpack-plugin
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
// https://github.com/GoogleChromeLabs/size-plugin
import * as SizePlugin from 'size-plugin'
// https://github.com/webpack/webpack
import * as webpack from 'webpack'
// https://github.com/th0r/webpack-bundle-analyzer
// https://webpack.js.org/guides/code-splitting/#bundle-analysis
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// https://github.com/FormidableLabs/webpack-dashboard
// @ts-ignore
import * as WebpackDashboard from 'webpack-dashboard/plugin'
// https://github.com/zouhir/jarvis
import * as Jarvis from 'webpack-jarvis'
// https://github.com/nuxt/webpackbar
import * as WebpackBar from 'webpackbar'

// https://github.com/webpack/webpack/releases/tag/v4.0.0
module.exports = {
    mode: 'development',

    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.json',
            '.css',
            '.scss',
            '.html',
        ],
    },

    // https://webpack.js.org/configuration/devtool
    devtool: 'source-map',
    // devtool: 'eval-source-map',

    // Ausgangsdateien fuer die Verarbeitung mit webpack
    entry: {
        app: ['./src/index.tsx'],
    },

    // Namen fuer Verzeichnisse und neu erstellte Dateien
    output: {
        path: path.resolve(__dirname, 'dist'),
        // app.js
        filename: 'js/[name].js',
    },

    // Loader uebersetzen, z.B. TypeScript -> JavaScript, Sass -> Css
    module: {
        rules: [
            // https://github.com/wbuchwalter/tslint-loader
            {
                enforce: 'pre',
                test: /\.(ts|tsx)$/,
                // https://github.com/wbuchwalter/tslint-loader
                loader: 'tslint-loader',
                options: {
                    configFile: 'tslint.yml',
                    failOnHint: true,
                    typeCheck: true,
                },
                exclude: [path.resolve(__dirname, 'node_modules')],
            },

            // https://github.com/TypeStrong/ts-loader
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {},
                    },
                ],
                exclude: [path.resolve(__dirname, 'node_modules')],
            },

            // Alternative zu ts-loader:
            // TODO https://github.com/s-panferov/awesome-typescript-loader/issues/534
            // {
            //     test: /\.tsx?$/,
            //     use: [
            //         {
            //             loader: 'awesome-typescript-loader',
            //             options: {
            //                 sourceMap: true,
            //                 useCache: true,
            //                 errorsAsWarnings: true,
            //             },
            //         },
            //     ],
            //     exclude: [path.resolve(__dirname, 'node_modules')],
            // },

            {
                // z.B. fuer Bootstrap
                test: /\.css$/,
                // https://github.com/webpack-contrib/css-loader
                loader: ['style-loader', 'css-loader'],
            },

            {
                test: /\.scss$/,
                // https://github.com/webpack-contrib/sass-loader
                loader: ['style-loader', 'css-loader', 'sass-loader'],
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        // https://github.com/webpack-contrib/file-loader
                        // Alternative: https://github.com/kevlened/copy-webpack-plugin
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    // Plugins, um Dateien zu erstellen
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(`${__dirname}/dist/js/chartjs-manifest.json`),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(`${__dirname}/dist/js/polyfills-manifest.json`),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(`${__dirname}/dist/js/react-manifest.json`),
        }),

        // http://github.com/jantimon/html-webpack-plugin
        // index.html erstellen einschl. Chunks fuer JS und app.css (s.o.)
        new HtmlWebpackPlugin({
            template: `${__dirname}/public/index.html`,
            favicon: `${__dirname}/public/favicon.ico`,
        }),

        // https://github.com/SimenB/add-asset-html-webpack-plugin
        // nicht kompatibel mit at-loader
        new AddAssetHtmlPlugin([
            {
                filepath: require.resolve('./dist/js/polyfills.dll.js'),
                outputPath: 'js',
                publicPath: 'js',
                includeRelatedFiles: false,
            },
            {
                filepath: require.resolve('./dist/js/chartjs.dll.js'),
                outputPath: 'js',
                publicPath: 'js',
                includeRelatedFiles: false,
            },
            {
                filepath: require.resolve('./dist/js/react.dll.js'),
                outputPath: 'js',
                publicPath: 'js',
                includeRelatedFiles: false,
            },
        ]),

        new CopyWebpackPlugin(
            [
                'public/fontawesome',
                'public/manifest.json',
                'public/robots.txt',
                {
                    from: 'public/img',
                    to: 'img',
                },
                {
                    from: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    to: 'css',
                },
                {
                    from: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    to: 'js',
                },
                {
                    from: 'node_modules/jquery/dist/jquery.slim.min.js',
                    to: 'js',
                },
                {
                    from: 'node_modules/popper.js/dist/popper.min.js',
                    to: 'js',
                },
                {
                    from: 'node_modules/pwacompat/pwacompat.min.js',
                    to: 'js',
                },
            ],
            // { debug: 'info' },
        ),

        new webpack.BannerPlugin(
            '(C) Juergen Zimmermann, 2018: http://www.gnu.org/licenses',
        ),
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        new DuplicatePackageCheckerPlugin(),

        new WebpackBar(),

        new WebpackDashboard(),

        // default port fuer Jarvis
        new Jarvis({ port: 1337 }),

        // Zur Visualisierung. Nervig beim Entwickeln...
        // https://github.com/th0r/webpack-bundle-analyzer
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
        }),

        new SizePlugin(),
    ],

    // https://webpack.js.org/configuration/watch
    // watch: true,
    cache: true,

    // https://webpack.js.org/configuration/dev-server
    // https://github.com/webpack/docs/wiki/webpack-dev-server
    // HMR = hot module replacement
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        hot: true,
        watchContentBase: true,
        https: {
            key: fs.readFileSync(`${__dirname}/config/webserver/https/key.pem`),
            cert: fs.readFileSync(
                `${__dirname}/config/webserver/https/certificate.cer`,
            ),
            ca: fs.readFileSync(`${__dirname}/config/webserver/https/key.pem`),
        },
        port: 443,
        overlay: {
            warnings: true,
            errors: true,
        },
        open: 'Chrome',
        compress: true,
        proxy: {
            '/rest': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/rest': '/buecher' },
            },
        },
        // "Redirect HTTP to HTTPS": https://webpack.js.org/guides/development/#using-webpack-dev-middleware
        // https://stackoverflow.com/questions/52594246/how-to-redirect-from-http-to-https
    },
}
