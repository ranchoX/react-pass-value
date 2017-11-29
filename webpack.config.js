const path = require('path')
module.exports={
    entry:{
        main:'./src/index.js' //编译的入口代码。对应的key就是编译出来的name
    },
    output:{
        filename: 'js/[name].js',//编译出来的文件名称
        publicPath: '/',//提供对外提供服务的地址
        path:path.resolve(__dirname,'dist')//编译后存放文件的绝对地址
    }
}