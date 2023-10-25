import { BASE_URL } from './baseUrl';
import * as base from "./baseService";
import UserData from "../interfaces/UserData"
import Credentials from '../interfaces/Credentials';

const endpointUrl = `${BASE_URL}/user`
const model = "user";

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

export function findAllUsers() {
  return base.findAll(model);
}

export async function findByUsername(username: string) {
  const response = await fetch(endpointUrl + `/${username}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
    },
  });

  if (response.status === 200) {
    const userData = await response.json();
    return userData;
  } else {
    return Promise.reject('User not found or unauthorized.');
  }
}

export async function createUser(credentials: Credentials) {
  return base.save('create_account', credentials, 0);
}

export async function updateUser(user: UserData) {
  return base.save(model, user, user.userId);
}

export async function deleteUserById(userId: number) {
  return base.deleteById(model, userId);
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