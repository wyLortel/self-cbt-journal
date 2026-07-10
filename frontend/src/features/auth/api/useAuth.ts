import { useState } from 'react'
import { apiCall } from '@shared/api/client'
import { LoginResponse, SignupResponse } from '@shared/api/types'
import { useAuthStore } from '../model/authStore'
import { LoginFormData, SignupFormData } from '../lib/validation'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setAuth } = useAuthStore()

  const login = async (data: LoginFormData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiCall<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
      setAuth(response.data.token, {
        user_id: response.data.user_id,
        email: response.data.email,
      })
      return response.data
    } catch (err: any) {
      const errorMessage = err.error || '로그인 실패'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signup = async (data: SignupFormData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiCall<SignupResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
      setAuth(response.data.token, {
        user_id: response.data.user_id,
        email: response.data.email,
      })
      return response.data
    } catch (err: any) {
      const errorMessage = err.error || '회원가입 실패'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { login, signup, loading, error }
}
