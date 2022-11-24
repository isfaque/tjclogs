'use strict';

const config = {

    local: {
        host: 'localhost:',
        port: 3000,
        baseUrl: 'http://localhost:3000/',
        DATABASE: {
            dbname: 'tjclogs',
            host: 'mongodb://localhost:',
            port: 27017,
            username: 'tjclogs',
            password: 'Tjclogs@123'
        },
        SMTP: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            authUser: 'test@gmail.com',
            authpass: 'test@123'
        }

    },
    prod: {
        host: '176.34.101.228:',
        port: 3000,
        baseUrl: 'http://176.34.101.228:3000/',
        DATABASE: {
            dbname: 'tjclogs',
            host: 'mongodb://127.0.0.1:',
            port: 27017,
            username: 'tjclog',
            password: 'Tjclog@123'
        },
        SMTP: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            authUser: 'test@gmail.com',
            authpass: 'test@123'
        }
    },

};
module.exports.get = function get(env) {
    return config[env] || config.default;
}
