module.exports = {
    username    : process.env.DB_USER || 'root',
    password    : process.env.DB_PASS || 'root',
    database    : process.env.DB_NAME || 'express_essential',
    host        : process.env.DB_HOST || 'localhost',
    dialect     : "mysql",
    logging     : false
}
  