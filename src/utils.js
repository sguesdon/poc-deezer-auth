const axios = require('axios').default;

module.exports.getJwt = async (appId, secret, code) => {
  const endpoint = `https://connect.deezer.com/oauth/access_token.php?app_id=${appId}&secret=${secret}&code=${code}`;
  const res = await axios.get(endpoint);
  const token = res.data.split('&')[0].split('=')[1];
  if(token) {
    return token;
  }
  throw new Error('invalid credentials');
};

module.exports.authorize = (appId, redirectUri) => {
  return (req, res, next) => {
    res.redirect(`https://connect.deezer.com/oauth/auth.php?app_id=${appId}&redirect_uri=${redirectUri}&perms=basic_access,email,offline_access`);
  };
}
