require("../app/config-env");

module.exports = {
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_bin"
    // freezeTableName: true
  },
  pool: {
    max: process.env.POSTGRES_POOL_MAX || 100,
    min: process.env.POSTGRES_POOL_MIN || 10,
    acquire: process.env.POSTGRES_POOL_ACQUIRE || 30000,
    idle: process.env.POSTGRES_POOL_IDLE || 10000
  },
  dialect: process.env.DB_DIALECT || "postgres",
  timezone: "UTC",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "5432",
  database: process.env.DB_NAME || "postgres",
  username: process.env.DB_USER || "izing",
  password: process.env.DB_PASS || "123@mudar",
  logging: false
};
