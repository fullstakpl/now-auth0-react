const axios = require('axios')
const cookie = require('cookie')
const app = require('express')()


app.get('*', async (req, res) => {
  const requestBody = {
    grant_type: 'authorization_code',
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_SECRET,
    redirect_uri: process.env.AUTH0_REDIRECT_URI,
    code: req.query.code
  }
  try {
    const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, requestBody)
    res.setHeader('Set-Cookie', cookie.serialize('jwt', response.data.id_token))
    res.redirect('/')
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = app
