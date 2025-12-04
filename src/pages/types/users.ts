import type { ReactNode } from 'react'

export interface UserDetailModalProps {
  isOpen: boolean
  onClose: () => void
  userId: number | null
  footer?: ReactNode
}

export interface UserDetailUser {
  id: number | string
  birthday: string
  created_at: string
  email: string
  gender: string
  name: string
  nickname: string
  phone_number: string
  profile_img_url: string
  role: string
  status: string
}

export interface UserFormType {
  id: number | string
  name: string
  nickname: string
  phone: string
  status: string
  email: string
  gender: string
  birthday: string
  role: string
  joinDateTime: string
}
