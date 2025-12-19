import type { Column } from '@/components/common/table'
import type { RoleType } from '@/config/role'
import type { StatusType } from '@/config/status'
import { getRole } from '@/pages/members/withdrawals/utils/getRole'
import { getStatus } from '@/pages/members/withdrawals/utils/getStatus'
import type { UserApiRawItem } from '@/pages/types/users'
import { formatDateTime } from '@/utils'

export const USER_COLUMNS: Column<UserApiRawItem>[] = [
  { key: 'id', header: '회원 ID', width: '100px' },
  { key: 'email', header: '이메일', width: '160px' },
  { key: 'nickname', header: '닉네임', width: '120px' },
  {
    key: 'name',
    header: '이름',
    width: '90px',
  },
  {
    key: 'birthday',
    header: '생년월일',
    width: '120px',
  },
  {
    key: 'role',
    header: '권한',
    width: '110px',
    render: (value: RoleType) => getRole(value),
    align: 'center',
  },
  {
    key: 'status',
    header: '상태',
    width: '110px',
    render: (value: StatusType) => getStatus(value),
    align: 'center',
  },
  {
    key: 'created_at',
    header: '가입일',
    width: '120px',
    render: (value: string) => formatDateTime(value),
  },
  {
    key: 'withdraw_at',
    header: '탈퇴요청일',
    width: '120px',
    render: (value: string) => formatDateTime(value),
  },
]
