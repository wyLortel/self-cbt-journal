export interface APIResponse<T = null> {
  success: boolean
  data: T
  error: string | null
}

export interface LoginResponse {
  user_id: string
  email: string
  token: string
  expires_at: string
}

export interface SignupResponse {
  user_id: string
  email: string
  token: string
  created_at: string
}

export interface ErrorResponse {
  success: false
  data: null
  error: string
}
