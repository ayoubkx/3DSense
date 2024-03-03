let axios;
(async () => {
  axios = (await import('axios')).default;

  const API = axios.create({
    baseURL: 'https://dsense-8baa5-default-rtdb.firebaseio.com/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  module.exports = API;
})();
