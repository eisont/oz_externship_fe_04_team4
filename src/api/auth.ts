import { ADMIN_API_PREFIX } from '@/mocks/handlers/adminHandlers'

export type LoginRequest = {
  email: string
  password: string
}
export type LoginResponse = {
  access_token: string
  refresh_token: string
  user: {
    id: number
    email: string
    name: string
    role: 'admin' | 'staff' | 'user'
  }
}

export async function loginAdmin(body: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${ADMIN_API_PREFIX}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody.error_detail ?? '로그인에 실패했습니다.')
  }

  return res.json()
}
