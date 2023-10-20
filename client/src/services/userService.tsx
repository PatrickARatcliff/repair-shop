import { BASE_URL } from './baseUrl';
import User from "../interfaces/User"
import Credentials from '../interfaces/Credentials';

const endpointUrl = `${BASE_URL}/user`

type JwtToken = string;

export async function login(credentials: Credentials) {

    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(credentials)
    };

    const response = await fetch(endpointUrl + '/login', init);
    if (response.status === 200) {
        const jwtTokenResponse = await response.json();
        localStorage.setItem('jwt_token', jwtTokenResponse.jwt_token);
        return makeUserFromJwt(jwtTokenResponse.jwt_token);
    } else {
        return Promise.reject('Unauthorized.');
    }
}

function makeUserFromJwt(jwtToken: JwtToken) {
    const jwtParts = jwtToken.split('.');
    if (jwtParts.length === 3) {
        const userData = atob(jwtParts[1]);
        const decodedToken = JSON.parse(userData);
        return {
            username: decodedToken.sub,
            authorities: decodedToken.authorities
        };
    }
}