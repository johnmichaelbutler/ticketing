import axios from 'axios';

const buildClient = ({ req }) => {
  console.log('server_base_url', process.env.SERVER_URL_BASE);
  if (typeof window === 'undefined') {
    // We are on the server
    return axios.create({
      baseURL: process.env.SERVER_URL_BASE,
      headers: req.headers,
    });
  } else {
    // We are on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};

export default buildClient;
