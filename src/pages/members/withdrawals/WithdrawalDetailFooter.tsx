import { useQueryClient } from '@tanstack/react-query'

import Button from '@/components/common/Button'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useMutateQuery } from '@/hooks/useMutateQuery'
interface WithdrawalDetailFooterProps {
  status?: string
  onClose: () => void
  withdrawalId: number
}
export function WithdrawalDetailFooter({
  //status,
  withdrawalId,
  onClose,
}: WithdrawalDetailFooterProps) {
  const queryClient = useQueryClient()

  const RestoreUserMutation = useMutateQuery<string, number>({
    url: SERVICE_URLS.ACCOUNTS.ACTIVATE(withdrawalId!),
    method: 'post',
    onSuccess: () => {
      alert('회원 복구가 완료되었습니다.')
      onClose()
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
    },
  })

  const handleUserRecovery = () => {
    RestoreUserMutation.mutate(withdrawalId)
  }
  return (
    <div className="flex w-full items-center justify-end">
      <div className="flex justify-end gap-3">
        <Button
          className="border-primary-light-gray text-primary-dark-gray border bg-white"
          onClick={onClose}
          type="button"
        >
          닫기
        </Button>
        <Button
          variant="custom"
          type="button"
          className="bg-primary-green text-white"
          onClick={handleUserRecovery}
        >
          회원 복구하기
        </Button>
      </div>
    </div>
  )
}
