import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { ROLE_LABEL } from '@/config/role'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { STATUS_LABEL } from '@/config/status'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { useMutateQuery } from '@/hooks/useMutateQuery'
import { UserDetailForm } from '@/pages/members/users/UserDetailForm'
import { UserDetailMemberDelete } from '@/pages/members/users/UserDetailMemberDelete'
import type {
  UserDetailModalProps,
  UserDetailUser,
  UserFormType,
} from '@/pages/types/users'
import { formatDataTimeForUserDetail } from '@/utils/formatDataTimeForUserDetail'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

export function UserDetailModal({
  isOpen,
  onClose,
  userId,
}: UserDetailModalProps) {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useFetchQuery<UserDetailUser>({
    queryKey: ['user-detail', userId],
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId || 0),
    enabled: !!userId && isOpen,
  })
  const queryClient = useQueryClient()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
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
    if (!isDeleteModalOpen) {
      setIsDeleteModalOpen(false)
    }
  }, [isOpen, isRoleModalOpen, isDeleteModalOpen, user])

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

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return

    setFile(file)

    const previewUrl = URL.createObjectURL(file)
    setProfileImg(previewUrl)
  }

  const handleUserDelete = () => {
    deleteUserMutation.mutate({})
  }

  const deleteUserMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.DELETE(userId!),
    method: 'delete',
    onSuccess: () => {
      alert('회원 삭제가 완료되었습니다.')
      setIsEditMode(false)
      onClose()
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
    },
  })

  const updateUserMutation = useMutateQuery({
    url: SERVICE_URLS.ACCOUNTS.DETAIL(userId!),
    method: 'postForm',
    onSuccess: () => {
      alert('회원 정보가 수정되었습니다.')
      setIsEditMode(false)
      refetch()
      queryClient.invalidateQueries({ queryKey: ['users-list'], exact: false })
    },
  })
  const handleFormEditOk = () => {
    const statusMap: Record<string, string> = {
      활성: 'active',
      비활성: 'inactive',
      탈퇴: 'withdraw',
    }
    const originalRoleKey = Object.keys(ROLE_LABEL).find(
      (key) => ROLE_LABEL[key as keyof typeof ROLE_LABEL] === form.role
    )
    updateUserMutation.mutate({
      name: form.name,
      nickname: form.nickname,
      phone_number: form.phone,
      gender: form.gender,
      status: statusMap[form.status],
      role: originalRoleKey,
      profile_img: file ?? undefined,
    })
  }
  console.log('회원정보 data', user)

  if (!isOpen || !userId) return null
  if (isLoading) return <div>회원 정보를 로딩 중입니다...</div>
  if (error) return <div>에러가 났습니다</div>

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="회원 상세 정보"
      className="z-50"
      contentClassName="h-130 overflow-y-auto"
      topCloseButton
      footerClassName="bg-[#F9FAFB]"
      footer={
        <div className="flex w-full items-center justify-between">
          <Button
            variant="custom"
            className="bg-primary-green text-white"
            onClick={() => {
              if (!isEditMode) setIsRoleModalOpen(true)
            }}
          >
            권한 변경하기
          </Button>
          <div className="flex justify-end gap-3">
            {isEditMode ? (
              <Button
                variant="custom"
                className="bg-primary-blue text-white"
                onClick={handleFormEditOk}
              >
                수정완료
              </Button>
            ) : (
              <Button
                variant="custom"
                className="bg-primary-blue text-white"
                onClick={() => setIsEditMode((prev) => !prev)}
              >
                수정하기
              </Button>
            )}

            <Button variant="delete" onClick={() => setIsDeleteModalOpen(true)}>
              삭제하기
            </Button>
            <UserDetailMemberDelete
              isDeleteModalOpen={isDeleteModalOpen}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              handleUserDelete={handleUserDelete}
            />
          </div>
        </div>
      }
    >
      {user && (
        <UserDetailForm
          profileImg={profileImg}
          isEditMode={isEditMode}
          user={user}
          form={form}
          role={role}
          setForm={setForm}
          fileInput={fileInput}
          setRole={setRole}
          isRoleModalOpen={isRoleModalOpen}
          setIsRoleModalOpen={setIsRoleModalOpen}
          handleFormChange={handleFormChange}
          handlePhoneBlur={handlePhoneBlur}
          handleImgChange={handleImgChange}
        />
      )}
    </Modal>
  )
}
