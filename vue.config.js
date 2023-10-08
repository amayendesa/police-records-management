module.exports = {
    transpileDependencies: ['vuetify'],
    publicPath: '/',
    devServer: {
        port: 9099,
        compress: true,
        disableHostCheck: true,
        proxy: {
            '/records_server/': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/records_server/': ''},
            },
        },
    },
}
