import { useState } from 'react'

import Modal from '@/components/common/Modal'
import SelectedTagList from '@/components/common/recruitment/modal/SelectedTagList'
import TagFilterActionButtons from '@/components/common/recruitment/modal/TagFilterActionButtons'
import TagOptionList from '@/components/common/recruitment/modal/TagOptionList'
import TagSearchInput from '@/components/common/recruitment/modal/TagSearchInput'
import { useRecruitmentModalStore } from '@/store/recruitment/useRecruitmentModalStore'

export default function RecruitmentModal() {
  const { isOpen, closeModal } = useRecruitmentModalStore()

  const [search, setSearch] = useState('')

  const handleSearchSubmit = () => {
    // 🔥 여기서 API 호출
    // 예: fetchTags({ search })
    // 혹은 React Query 쓰면 refetch() 호출
    // console.log('검색 API 호출, keyword:', search)
  }
  return (
    <Modal
      isOpen={isOpen}
      title="태그 필터 선택"
      contentClassName="p-0"
      footer={<TagFilterActionButtons />}
      footerClassName="p-0"
      topCloseButton
      onClose={closeModal}
    >
      <TagSearchInput
        search={search}
        setSearch={setSearch}
        onSubmit={handleSearchSubmit}
      />
      <SelectedTagList />
      <TagOptionList />
    </Modal>
  )
}
