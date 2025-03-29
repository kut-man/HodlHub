const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://hodlhubspring.onrender.com"
    : "http://localhost:8080";
export const LOGOUT_URL = `${BASE_URL}/logout`;
export const LOGIN_URL = `${BASE_URL}/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const VERIFY_URL = `${BASE_URL}/auth/verify-email`;
export const USER_URL = `${BASE_URL}/user`;
export const PORTFOLIO_URL = `${BASE_URL}/portfolio`;
export const COIN_URL = `${BASE_URL}/coin`;
export const TRANSACTION_URL = `${BASE_URL}/transaction`;
