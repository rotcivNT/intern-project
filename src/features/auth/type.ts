export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginApiResponse {
  token: string;
  refreshToken: string;
  scope: string | null;
}
