const 

    /**
     * Pasta aonde esta localizado o arquivo de entrada
     */
    entry_path  = './resources/js',

    /**
     * Pasta de saida dos arquivos após a compilação
     */
    output_path = './public/assets',

    /**
     * Pasta publica
     */
    public_path = output_path,

    /**
     * Bibliotecas
     */
    path                = require('path'),
    ExtractTextPlugin   = require('extract-text-webpack-plugin'),
    webpack             = require('webpack'),
    TerserPlugin        = require('terser-webpack-plugin'),
    { VueLoaderPlugin } = require('vue-loader')

module.exports = function (env, argv) {

    const time      = new Date().getTime(),

        /**
         * Modo de compilação: Desenvolvimento ou Produção
         */
        mode        = argv.mode || 'development';

    return {
        watch   : mode === 'development',
        target  : 'web',
        mode    : mode,
        entry   : {
            bundle   : path.resolve(entry_path, 'app.js'),
        },
        output  : {
            filename        : `js/[name].js`,
            chunkFilename   : `js/[name].js?v=${time}`,
            path            : path.resolve(__dirname, output_path),
            publicPath      : public_path
        },
        node : {
            process : true
        },
        stats : {
            colors          : true,
            modules         : false,
            reasons         : false,
            errorDetails    : true
        },
        module  : {
            rules: [
                /**
                 * Vue
                 */
                {
                    test    : /\.vue$/,
                    use     : 'vue-loader'
                },
                /**
                 * Sass e Css
                 */
                {
                    test        : /\.scss$/,
                    use         : ExtractTextPlugin.extract({
                        fallback    : 'style-loader',
                        use         : [
                            { 
                                loader: 'css-loader?url=false'
                            },
                            {
                                loader : 'sass-loader'
                            }
                        ]
                    })
                }
            ]
        },
        plugins : [
            new ExtractTextPlugin({
                filename : path.join(`css/[name].css`)
            }),
            new webpack.ProvidePlugin({
                $               : 'jquery',
                jQuery          : 'jquery',
                'window.jQuery' : 'jquery',
                Vue             : [
                    'vue/dist/vue.esm.js', 
                    'default'
                ]
            }),
            new VueLoaderPlugin()
        ],
        resolve : {
            extensions : [ 
                '.jsx', 
                '.js',
                '.json',
                '.vue'
            ]
        },
        optimization : {
            minimizer : [
                new TerserPlugin({
                    terserOptions : {
                        output : {
                            comments : false
                        }
                    }
                })
            ]
        }
    };
};