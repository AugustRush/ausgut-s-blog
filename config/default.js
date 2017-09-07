module.exports = {
    port: 3000,
    session: {//express-session 的配置信息
        secret: 'august\'s blog',
        key: 'august\'s blog',
        maxAge: 1238987
    },
    mongodb: 'mongodb://localhost:27017/myblog'//mongodb 的地址，myblog 为 db 名
};