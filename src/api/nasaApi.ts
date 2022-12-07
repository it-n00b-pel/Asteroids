import axios from 'axios';

export const nasaApi = {
    getAsteroids(api_key = 'API_KEY') {
        return axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY`);
    },
};