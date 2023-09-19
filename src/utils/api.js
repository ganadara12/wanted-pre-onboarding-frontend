// /utils/api.js

import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.pre-onboarding-selection-task.shop/'
});

export default instance;
