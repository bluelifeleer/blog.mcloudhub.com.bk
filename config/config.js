const config = {
    'base_path': process.cwd(),
    'base_url': 'blog.mcloudhub.com',
    'mongo': {
        'host': 'loccalhost',
        'port': 27017,
        'user': '',
        'password': '',
        'db': 'blog'
    },
    'redis': {
        'host': 'loccalhost',
        'port': 6379,
        'user': '',
        'password': '',
        'select': 0
    }
};

module.exports = config;