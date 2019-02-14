const autoprefixer = require('autoprefixer');

console.log('===================')

module.exports = {
    plugins: [
        autoprefixer({ browsers: 'last 10 version' }),
    ]
}