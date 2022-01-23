const fs = require('fs');

module.exports = {
  dev: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: process.env.DB_ENGINE,
    migrationStorage: "json",
    migrationStoragePath: "devMeta.json",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: process.env.DB_ENGINE,
    migrationStorage: "json",
    migrationStoragePath: "testMeta.json",
  },
  prod: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: process.env.DB_ENGINE,
    migrationStorage: "json",
    migrationStoragePath: "prodMeta.json",
  },
};
