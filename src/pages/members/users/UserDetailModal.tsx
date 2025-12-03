import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { formatDataTimeForUserDetail } from '@/utils/formatDataTimeForUserDetail'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
interface UserDetailModalProps {
  isOpen: boolean
  onClose: () => void
  userId: number | null
  footer?: ReactNode
}

interface UserDetailUser {
  birthday: string
  created_at: string
  email: string
  gender: string
  id: number
  name: string
  nickname: string
  phone_number: string
  profile_img_url: string
  role: string
  status: string
}

export function UserDetailModal({
  isOpen,
  onClose,
  userId,
}: UserDetailModalProps) {
  const {
    data: user,
    isLoading,
    error,
  } = useFetchQuery<UserDetailUser>({
    queryKey: ['users', userId],
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId || 0),
    enabled: !!userId && isOpen,
  })
  const queryClient = useQueryClient()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [profileImg, setProfileImg] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [role, setRole] = useState('')
  const [form, setForm] = useState<UserFormType>({
    id: userId ?? 0,
    name: '',
    nickname: '',
    phone: '',
    status: '',
    email: '',
    gender: '',
    birthday: '',
    role: '',
    joinDateTime: '',
  })

  useEffect(() => {
    if (!user) return
    setForm({
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      phone: user.phone_number ? formatPhoneNumber(user.phone_number) : '',
      status: STATUS_LABEL[user.status as keyof typeof STATUS_LABEL] ?? '',
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
      role: ROLE_LABEL[user.role as keyof typeof ROLE_LABEL] ?? '',
      joinDateTime: user.created_at
        ? formatDataTimeForUserDetail(user.created_at)
        : '',
    })
  }, [user])

  useEffect(() => {
    if (!isOpen) {
      setIsEditMode(false)
    }
    if (!isRoleModalOpen) {
      setRole('')
    } else if (isRoleModalOpen && user) {
      setRole(user.role)
    }
  }, [isOpen, isRoleModalOpen, user])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const onlyNumbers = value.replace(/\D/g, '')
      setForm((prev) => ({
        ...prev,
        phone: onlyNumbers,
      }))
      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhoneBlur = () => {
    setForm((prev) => ({
      ...prev,
      phone: formatPhoneNumber(prev.phone),
    }))
  }

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFile(file)

    const previewUrl = URL.createObjectURL(file)
    setProfileImg(previewUrl)
  }

  const updateUserMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId!),
    method: 'patch',
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.')
      setIsEditMode(false)
      queryClient.invalidateQueries({ queryKey: ['users'], exact: false })
    },
  })
  const handleFormEditOk = () => {
    const formData = new FormData()

    formData.append('name', form.name)
    formData.append('nickname', form.nickname)
    formData.append('phone_number', form.phone)
    formData.append('gender', form.gender)

    const statusMap: Record<string, string> = {
      활성: 'active',
      비활성: 'inactive',
      탈퇴: 'withdraw',
    }
    formData.append('status', statusMap[form.status])

    const originalRoleKey = Object.keys(ROLE_LABEL).find(
      (key) => ROLE_LABEL[key as keyof typeof ROLE_LABEL] === form.role
    )
    if (originalRoleKey) {
      formData.append('role', originalRoleKey)
    }
    if (file) {
      formData.append('profile_img', file)
    }
    updateUserMutation.mutate(formData)
  }
  console.log('회원정보 data', user)

  if (!isOpen || !userId) return null
  if (isLoading) return <div>회원 정보를 로딩 중입니다...</div>
  if (error) return <div>에러가 났습니다</div>
  {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="회원 상세 정보"
        contentClassName="h-130 overflow-y-auto"
        topCloseButton
        footerClassName="bg-[#F9FAFB]"
        footer={
          <div className="flex w-full items-center justify-between">
            <Button variant="custom" className="bg-primary-green text-white">
              권한 변경하기
            </Button>
            <div className="flex justify-end gap-3">
              <Button variant="custom" className="bg-primary-blue text-white">
                수정하기
              </Button>
              <Button variant="delete">삭제하기</Button>
            </div>
          </div>
        }
      >
        {user && (
          <div>
            <div className="flex items-center justify-start gap-4">
              <div>
                <img
                  src="https://placehold.co/80"
                  title={user.profile_img_url}
                  className="overflow-hidden rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">{user.role}</span>
                <span className="text-base">{user.email}</span>
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <div className="flex flex-col gap-6">
                <Input label="회원ID" value={user.id} />
                <Input label="이름" value={user.name} />
                <Input label="닉네임" value={user.nickname} />
                <Input label="연락처" value={user.phone_number} />
                <Input label="상태" value={user.status} />
              </div>
              <div className="flex flex-col gap-6">
                <Input label="이메일" value={user.email} />
                <Input label="성별" value={user.gender} />
                <Input label="생년월일" value={user.birthday} />
                <Input label="권한" value={user.role} />
                <Input label="회원가입 일시" value={user.created_at} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    )
  }
}
