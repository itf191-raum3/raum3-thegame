# Setup
- - -
1. MySql Server (Empfohlen) [Hier](https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-web-community-8.0.25.0.msi) Installieren
2. `ormconfig.template.ts` in `ormconfig.ts` umbenennen

# Default Config
```ts
export = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "raum3",
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: true,
    entities: [
        "./src/entities/**/*.ts"
    ],
    migrations: [
        "./src/migrations/**/*.ts"
    ]
}
```