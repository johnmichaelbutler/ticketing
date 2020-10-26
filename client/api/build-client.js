import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server
    return axios.create({
      baseURL:
        'http://nginx-ingress-1602167419-controller.default.svc.cluster.local',
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
