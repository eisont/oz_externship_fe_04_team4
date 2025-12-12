import Button from '@/components/common/Button'
interface WithdrawalDetailFooterProps {
  status: string
  onClose: () => void
}
export function WithdrawalDetailFooter({
  status,
  onClose,
}: WithdrawalDetailFooterProps) {
  const handleUserRecovery = () => {
    if (status === 'active') {
      alert('회원입니다')
    } else if (status === 'deactive') {
      alert('비활성입니다')
    } else {
      alert('탈퇴요청입니다')
    }
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
