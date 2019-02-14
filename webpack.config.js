let path = require('path'); // помогает получить абсолютный путь из относительного для места сборки

const ExtractTextPlugin = require("extract-text-webpack-plugin"); // плагин для формирования отдельного файла стилей, не включенного в js

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');


let conf = {
    entry: './src/js/index.js', // точка входа, откуда собираются файлы
    output: {
        path: path.resolve(__dirname, './dist/js'), // путь к месту сборки
        filename: 'main.js', // имя файла, который соберется
        publicPath: 'dist/', // имя виртуальной папки для синхронизации браузера, название которой конкатенируется с именем выходного файла
    },
    devServer: {
        overlay: true // вывод ошибок из консоли прямо на страницу на красивом черном фоне
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Все файлы с расширением, указанным в регулярке
                exclude: /(node_modules|bower_components)/, // Какие папки исключить из обработки babel-ом (не обязательно)
                use: {
                    loader: 'babel-loader', // Какой лоадер использовать
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
            },
            {
                test: /\.css$/, // Все файлы с расширением, указанным в регулярке
                exclude: /(node_modules|bower_components)/, // Какие папки исключить из обработки babel-ом (не обязательно)
                use: ExtractTextPlugin.extract({
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader', 'postcss-loader'],
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    'img-loader'
                ],
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("../css/styles.css"),

    ],
    devtool: "eval-sourcemap"
};

module.exports = (envirenment, options) => { // функция принимает аргументы "среда" и "опция"
    const prod = options.mode === 'production';

    conf.devtool = prod // в зависимости от мода (продакшн или девелопмент) подставляется нужная карта
        ? false
        : 'eval-sourcemap';

    return conf; // экспорт конфига во внешний мир
}

/*
*
npm i --save-dev file-loader //
npm i --save-dev img-loader //
npm i --save-dev svg-url-loader //
npm i --save-dev postcss-loader //
npm i --save-dev clean-webpack-plugin //
npm i --save-dev copy-webpack-plugin //
npm i --save-dev imagemin-webpack-plugin //
npm i --save-dev uglifyjs-webpack-plugin //
*
* */