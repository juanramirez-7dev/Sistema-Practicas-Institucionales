import { callApi } from "../lib/api/callApi";
import type { Login, User } from "../types/authTypes";

async function login(credentials: Login): Promise<User> {
  return await callApi<User>("/Authentication/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
}

async function logout(): Promise<void> {
  await callApi<void>("/Authentication/logout", {
    method: "POST",
  })
} 

async function getMe(): Promise<User> {
  return await callApi<User>("/Authentication/me");
}

export const authService = {
  login,
  logout,
  getMe,
};