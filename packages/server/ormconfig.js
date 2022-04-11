const { join } = require("path");


module.exports = {
   type: "mysql",
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.MYSQL_DB,
   synchronize: true,
   logging: false,
   seeds: ["seeders/**/*{.ts,.js}"],
   factories: ["factories/**/*{.ts,.js}"],
   entities: [join(__dirname, "src", "entities", "!(*.test).+(ts|js)")],
   migrations: [
      "src/migration/**/*.ts"
   ],
   subscribers: [
      "src/subscriber/**/*.ts"
   ],
   cli: {
      "entitiesDir": "src/entities",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}