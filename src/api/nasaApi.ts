import axios, {AxiosResponse} from 'axios';

// const api_key = (process.env.REACT_APP_API_KEY as string).substring(1, (process.env.REACT_APP_API_KEY as string).length - 2);
const api_key = "tSadAmd1TDF3FTTx1FqWVCyipcmhfEMZg4dITlv3"

export const nasaApi = {
    getAsteroids(start_date: string, end_date: string): Promise<AxiosResponse<AsteroidsResponseType>> {
        return axios.get<AsteroidsResponseType>(`https://api.nasa.gov/neo/rest/v1/feed?`, {params: {start_date, end_date, api_key}});
    },
};

export type AsteroidsResponseType = {
    links: Links,
    element_count: number,
    near_earth_objects: {
        [asteroid: string]: AsteroidType[]
    }
}

export type Links = {
    next: string,
    previous: string,
    self: string,
}

export type AsteroidType = {
    links: {
        self: string,
    },
    id: string,
    'neo_reference_id': string,
    'name': string,
    'nasa_jpl_url': string,
    'absolute_magnitude_h': number,
    'estimated_diameter': {
        'kilometers': {
            'estimated_diameter_min': number,
            'estimated_diameter_max': number,
        },
        'meters': {
            'estimated_diameter_min': number,
            'estimated_diameter_max': number,
        },
        'miles': {
            'estimated_diameter_min': number,
            'estimated_diameter_max': number,
        },
        'feet': {
            'estimated_diameter_min': number,
            'estimated_diameter_max': number,
        }
    },
    'is_potentially_hazardous_asteroid': boolean,
    'close_approach_data': [
        {
            'close_approach_date': Date,
            'close_approach_date_full': Date,
            'epoch_date_close_approach': number,
            'relative_velocity': {
                'kilometers_per_second': string,
                'kilometers_per_hour': string,
                'miles_per_hour': string,
            },
            'miss_distance': {
                'astronomical': string,
                'lunar': string,
                'kilometers': string,
                'miles': string,
            },
            'orbiting_body': string,
        }
    ],
    'is_sentry_object': boolean
}