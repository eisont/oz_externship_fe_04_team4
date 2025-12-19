import dayjs from 'dayjs'

import type { Column } from '@/components/common/table'
import { REASON_LABEL, type ReasonKey } from '@/config/reason'
import type { RoleType } from '@/config/role'
import { getRole } from '@/pages/members/withdrawals/utils/getRole'
import type { WithdrawalsApiRawItem } from '@/pages/types/users'

export const WITHDRAWAL_COLUMNS: Column<WithdrawalsApiRawItem>[] = [
  {
    key: 'id',
    header: '탈퇴요청 ID',
    width: '130px',
    sortable: { asc: 'oldest', desc: 'latest' },
  },
  { key: 'email', header: '이메일', width: '160px' },
  {
    key: 'name',
    header: '이름',
    width: '80px',
    align: 'center',
  },
  {
    key: 'role',
    header: '권한',
    width: '100px',
    render: (value: RoleType) => getRole(value),
  },
  {
    key: 'birthday',
    header: '생년월일',
    width: '110px',
  },
  {
    key: 'reason',
    header: '탈퇴사유',
    width: '160px',
    render: (value: ReasonKey) => REASON_LABEL[value],
  },
  {
    key: 'withdrawn_at',
    header: '탈퇴일시',
    width: '200px',
    render: (value: string) =>
      dayjs(value).locale('ko').format('YYYY. M. D. A h:mm:ss'),
    sortable: { asc: 'oldest', desc: 'latest' },
  },
]
