import { APIResponse } from './types'

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:3000'

export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<APIResponse<T>> {
  const url = `${API_URL}${endpoint}`
  let response: Response

  try {
    response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })
  } catch {
    throw {
      status: 0,
      success: false,
      data: null,
      error: '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
    }
  }

  let data
  try {
    data = await response.json()
  } catch {
    throw {
      status: response.status,
      success: false,
      data: null,
      error: '서버 응답을 처리할 수 없습니다.',
    }
  }

  if (!response.ok) {
    throw {
      status: response.status,
      ...data,
    }
  }

  return data
}
