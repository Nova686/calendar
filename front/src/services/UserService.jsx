import { UserSaveModel } from "../Models/UserModel";
import { api } from "./ApiService";

const registerPath = "/register";
const getUserInfoPath = "/user/current";

export async function saveUser(userToSave) {
  const saveUserResponse = await api
    .post(registerPath, userToSave)
    .catch((error) => {
      throw error;
    });
  const data = saveUserResponse.data;

  return data.token;
}

export async function getCurrentUserInfo() {
  const currentUserInfoResponse = await api.get(getUserInfoPath);

  const currentUserInfo = {
    ...currentUserInfoResponse.data,
  };

  return currentUserInfo;
}
