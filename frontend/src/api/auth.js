
import client from "./client"

//  LOGIN (JSON body)
export const login = (email, password) => {
  return client.post("/auth/login", {
    email,
    password,
  })
}

//  SIGNUP (JSON body)
export const signup = (email, password) => {
  return client.post("/auth/signup", {
    email,
    password,
  })
}