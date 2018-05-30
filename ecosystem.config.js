module.exports = {
    apps: [{
        name: "blog",
        script: "./app.js",
        cwd: process.cwd(),
        watch: true,
        env: {
            "PORT": 443,
            "NODE_ENV": "development"
        },
        env_production: {
            "PORT": 443,
            "NODE_ENV": "production",
        },
        instances: 'max', // 可以指定进程数，如4：表示
        exec_mode: 'fork' // mode to start your app, can be “cluster” or “fork”, default fork
    }]
};

//pm2 start ecosystem.config.js --env production
