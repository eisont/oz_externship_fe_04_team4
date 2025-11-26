import { loginAdmin, type LoginRequest, type LoginResponse } from '@/api/auth'
import { useMutation } from '@tanstack/react-query'

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginAdmin,
  })
}
