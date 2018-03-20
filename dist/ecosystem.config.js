"use strict";

module.exports = {
    apps: [{
        name: "blog",
        script: "./app.js",
        watch: true,
        env: {
            "PORT": 443,
            "NODE_ENV": "development"
        },
        env_production: {
            "PORT": 443,
            "NODE_ENV": "production"
        },
        instances: 'max', // 可以指定进程数，如4：表示
        exec_mode: 'cluster'
    }]

    //pm2 start ecosystem.config.js --env production

};
//# sourceMappingURL=ecosystem.config.js.map