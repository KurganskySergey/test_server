const {
    resolve
} = require('path')
// const {
//     Client
// } = require('./app/entity/client')

module.exports = [{
        "name": "development",
        "type": "sqlite",
        "database": "./db.sql",
        "logging": ["query", "schema", "error"],
        "entities": [resolve(__dirname, "app/entity/**/**{.ts,.js}")],
        "migrations": [resolve(__dirname, "app/migration/**/**{.ts,.js}")]
    },
    {
        "name": "test",
        "type": "sqlite",
        "database": "./test_db.sql",
        "logging": ["query", "schema", "error"],
        "dropSchema": true,
        "synchronize": true,
        "entities": [resolve(__dirname, "app/entity/**/**{.ts,.js}")],
        "migrations": [resolve(__dirname, "app/migration/**/**{.ts,.js}")]
    }
]