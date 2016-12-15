module.exports = {
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
    entry: __dirname + "/app/main.js", //文件的入口
    output: {
        path: __dirname + "/public", //打包之后的文件存放出口
        filename: "bundle.js" //打包之后输出的文件名
    },
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    }
}