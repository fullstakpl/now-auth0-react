const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

module.exports = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  jwt.verify(cookies.jwt, getKey, (err, decoded) => {
    if(err) {
      res.status(403).json({ error: err })
    } else {
      res.status(200).json({ user: decoded })
    }
  })
}
