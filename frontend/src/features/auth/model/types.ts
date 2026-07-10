export interface AuthUser {
  user_id: string
  email: string
}

export interface AuthState {
  token: string | null
  user: AuthUser | null
  setAuth: (token: string, user: AuthUser) => void
  logout: () => void
}
