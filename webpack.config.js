const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
module.exports = {
    entry: {
        main: './src/index.js' //编译的入口代码。对应的key就是编译出来的name
    },
    output: {
        filename: 'js/[name].js',//编译出来的文件名称
        publicPath: '/',//提供对外提供服务的地址
        path: path.resolve(__dirname, 'dist')//编译后存放文件的绝对地址
    },
    resolve: {
        extensions: [
            '.js', '.jsx'
        ]
    },
    plugins: [
        new CaseSensitivePathsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),//只编译src里面的文件里面的js
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                'babel-preset-env',
                                'babel-preset-react',
                                'babel-preset-stage-0',
                            ],
                            plugins: ['transform-runtime'],//这样就不用引用babel-polyfill
                            cacheDirectory: true,
                        },
                    },
                ]
            }

        ]
    }
}