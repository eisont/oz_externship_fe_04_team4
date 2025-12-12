import { useMutation } from '@tanstack/react-query'

import { loginAdmin, type CreateLoginBody } from '@/features/login/api'
import { useAuthStore } from '@/store/authStore'
import type { CreateLoginResponse } from '@/types/api/response'

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation<CreateLoginResponse, Error, CreateLoginBody>({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      setAuth(data)
    },
  })
}
