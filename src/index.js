const axios = require('axios').default;
const { getJwt } = require('./utils');
const express = require('express');
const config = require('../resources/config.json');

const app = express();

app.use('', express.static('public'));

app.use('/callback.html', async (req, res, next) => {

  let jwt;

  try {
      jwt = await getJwt(config.appId, config.secret, req.query.code);
  } catch(err) {
      res.redirect('authorize.html');
      return;
  }

  const userProperties = (await axios.get('https://api.deezer.com/user/me?output=json&access_token=' + jwt)).data;
  res.json(userProperties);

});

app.listen(8081);
