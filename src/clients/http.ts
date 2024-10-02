import axios from 'axios';

import environment from '@/config/environment';

const http = {
  backend: axios.create({
    baseURL: environment.NEXT_PUBLIC_BACKEND_URL,
  }),
};

export default http;
