import { jwtDecode } from "jwt-decode";
import { api } from "./ApiService";
import { UserSaveModel } from "../Models/UserModel";
import { saveUser } from "./UserService";

export function isUserAuthenticated() {
  return getApiToken() !== null;
}

export function getApiToken() {
  return localStorage.getItem("apiToken");
}

export function getConnectedUserUsername() {
  const token = getApiToken();
  if (token === null) return null;

  const decodedToken = jwtDecode(token);
  return decodedToken.username;
}

export async function loginUser(username, password) {
  const loginUserResponse = await api.post("login_check", {
    username: username,
    password: password,
  });
  const apiToken = loginUserResponse.data.token;
  setApiToken(apiToken);
}

export async function registerUser(userToRegister) {
  const apiToken = await saveUser(userToRegister);
  console.log(apiToken);
  setApiToken(apiToken);
}

function setApiToken(apiToken) {
  localStorage.setItem("apiToken", apiToken);
}

function removeApiToken() {
  localStorage.removeItem("apiToken");
}

export function askUserForConnection(displayError = true) {
  removeApiToken();
  const queryParams = new URLSearchParams({
    error: displayError ? "true" : "",
  });
  window.location.href = `/login?${queryParams}`;
}

export function disconnectUser(setIsAuthenticated) {
  removeApiToken();
  setIsAuthenticated(false);
}
