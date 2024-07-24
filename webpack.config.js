const Encore = require('@symfony/webpack-encore');
const path = require('path');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/app.js')
    .enableVueLoader()
    .enableSassLoader()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableIntegrityHashes(Encore.isProduction())
    .cleanupOutputBeforeBuild()
    .configureFilenames({
        js: '[name].[hash].js',
        css: '[name].[hash].css',
    })
    .addAliases({
        '@': path.resolve(__dirname, 'assets'),
    })
    

module.exports = Encore.getWebpackConfig();
