export = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "USERNAME_HERE",
  password: "PASSWORD_HERE",
  database: "DATABASE_HERE",
  synchronize: true,
  dropSchema: false,
  migrationsRun: true,
  logging: true,
  "entities": [
    "./src/entities/**/*.ts"
  ]
}



