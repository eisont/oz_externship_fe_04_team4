import { authFetch } from '@/api/client'
import { API_URL } from '@/config/api'
import type { CreateLoginResponse } from '@/types/api/response'

export type CreateLoginBody = {
  email: string
  password: string
}

export async function loginAdmin(
  body: CreateLoginBody
): Promise<CreateLoginResponse> {
  const res = await authFetch(`${API_URL}/login`, {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody.error_detail ?? '로그인에 실패했습니다.')
  }

  return res.json()
}
