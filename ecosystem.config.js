module.exports = {
    apps : [
        {
            name: "blog",
            script: "./app.js",
            watch: true,
            env: {
                "PORT": 80,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 443,
                "NODE_ENV": "production",
            }
        }
    ]
}

//pm2 start ecosystem.config.js --env production