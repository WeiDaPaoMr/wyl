const TOKEN_KEY = "token"
const USER_INFO_KEY = "UserInfo"

export const SetToken = () => {
    localStorage.setItem(TOKEN_KEY, token)
}
export const GetToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}
export const RemoveTokenAndUserInfo = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_INFO_KEY)

}

export const SetUserInfo = (userinfo) => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userinfo))
}
export const GetUserInfo = () => {
    return JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}")

}