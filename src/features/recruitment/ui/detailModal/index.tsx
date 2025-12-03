import { useState } from 'react'

import { useRecruitmentTagsQuery } from '@/api/recruitment/useRecruitmentTagsQuery'
import Modal from '@/components/common/Modal'
import SelectedTagList from '@/features/recruitment/ui/tagFilterModal/SelectedTagList'
import TagFilterActionButtons from '@/features/recruitment/ui/tagFilterModal/TagFilterActionButtons'
import TagOptionList from '@/features/recruitment/ui/tagFilterModal/TagOptionList'
import TagSearchInput from '@/features/recruitment/ui/tagFilterModal/TagSearchInput'
import { useDetailModalStore } from '@/store/recruitment/useRecruitmentModalStore'
import { useRecruitmentTagsStore } from '@/store/recruitment/useRecruitmentTagsStore'

export default function RecruitmentDetailModal() {
  const { isDetailOpen, closeDetailModal } = useDetailModalStore()

  const [inputSearch, setInputSearch] = useState('')
  const [keywordSearch, setKeywordSearch] = useState('')

  const { selectedTags } = useRecruitmentTagsStore()

  const { data, isLoading, isError } = useRecruitmentTagsQuery({
    page: 1,
    pageSize: 100,
    search: keywordSearch,
  })

  const handleSearchSubmit = () => {
    setKeywordSearch(inputSearch.trim())
  }

  return (
    <Modal
      isOpen={isDetailOpen}
      title="디테일 페이지"
      contentClassName="p-0"
      footer={<TagFilterActionButtons />}
      footerClassName="p-0"
      topCloseButton
      onClose={closeDetailModal}
    >
      <TagSearchInput
        search={inputSearch}
        setSearch={setInputSearch}
        onSubmit={handleSearchSubmit}
      />

      {Boolean(selectedTags.length) && <SelectedTagList />}

      <TagOptionList
        tags={data?.results}
        isLoading={isLoading}
        isError={isError}
      />
    </Modal>
  )
}
