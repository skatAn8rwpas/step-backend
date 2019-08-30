const isProd = (process.env.NODE_ENV == 'production')
const { DB_USER, DB_PASS } = process.env

module.exports = {
  DB_URIS: isProd
    ? `mongodb+srv://${DB_USER}:${encodeURIComponent(DB_PASS)}@cluster0-m08ua.azure.mongodb.net/test?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017/test_db',
}
