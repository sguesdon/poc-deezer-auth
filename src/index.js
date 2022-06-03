const axios = require('axios').default;
const { getJwt, authorize } = require('./utils');
const express = require('express');
const config = require('../resources/config.json');

const app = express();

app.use('/authorize', authorize(config.appId, `${config.host}/callback`));

app.use('/callback', async (req, res, next) => {

  let jwt;

  try {
      jwt = await getJwt(config.appId, config.secret, req.query.code);
  } catch(err) {
      res.redirect('authorize');
      return;
  }

  const userProperties = (await axios.get('https://api.deezer.com/user/me?output=json&access_token=' + jwt)).data;
  res.json(userProperties);

});


app.use((req, res, next) => {
  res.redirect('authorize');
});

console.log(`server starting at port ${config.port}`);
app.listen(config.port);
