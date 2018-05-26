 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 const path = require("path");

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        //1、 可指定服务器根目录如：src/root 方便本地查看，前提有该文件夹
        contentBase: path.join(__dirname, "data"),
        inline: true,
        port: 8088,
        //2、 指定本地电脑的IP作为host,方便同一个局域网手机查看效果，请填写自己本机的IP地址或者localhost
        host: "172.16.9.142",
        //3、 是否需要跨域去请求接口本地测试
        proxy: {
            "/api":{
                target:"xxx.xx.com",
                changeOrigin:true,
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    }
});