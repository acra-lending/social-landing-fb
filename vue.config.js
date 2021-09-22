module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Acra Lending | Non-QM Mortgages";
                return args;
            })
    }
}