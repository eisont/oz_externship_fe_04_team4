import clsx from 'clsx'
import { ListFilter } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import { FilterSelect, SearchInput } from '@/components/common/filter'
import { useRecruitmentModalStore } from '@/store/recruitment/useRecruitmentModalStore'
import { useRecruitmentSearchStore } from '@/store/recruitment/useRecruitmentSearchStore'
import { ueeRecruitmentStatusStore } from '@/store/recruitment/useRecruitmentStatusStore'
import { useRecruitmentTagListStore } from '@/store/recruitment/useRecruitmentTagsStore'

const LABEL_STYLE = 'text-sm text-[#374151]'
const BOX_STYLE = 'w-[256px] h-9 focus:ring-0 focus:border-0'

export default function RecruitmentFilter() {
  const { openModal } = useRecruitmentModalStore()
  const { keyword, setKeyword } = useRecruitmentSearchStore()
  const { status, setStatus } = ueeRecruitmentStatusStore()

  const { selectedTagsResult } = useRecruitmentTagListStore()

  function TagsResult() {
    const joined = selectedTagsResult.join('')
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(selectedTagsResult.join(''))
    const hasTags = selectedTagsResult.length > 0
    const isMultiTag = selectedTagsResult.length > 1

    if (!hasTags) {
      return (
        <div className="flex gap-0.5 truncate text-sm text-[#374151]">
          {selectedTagsResult.length
            ? selectedTagsResult.map((el) => (
                <div
                  key={el}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                >
                  {el}
                </div>
              ))
            : '태그 입력'}
        </div>
      )
    }
    if (!isKorean) {
      const isLong = joined.length > 30
      if (isLong && isMultiTag) {
        const englishVisible = selectedTagsResult
          .join('&^')
          .slice(0, 25)
          .split('&^')

        const restCount = selectedTagsResult.length - englishVisible.length

        return (
          <div className="flex gap-0.5 text-sm text-[#374151]">
            {englishVisible.map((el) => (
              <div
                key={el}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
              >
                {el}
              </div>
            ))}
            {restCount > 0 && (
              <div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                {`+ ${restCount}`}
              </div>
            )}
          </div>
        )
      } // (2) 한 개만 있고 길이 김 → 한 개만 길이 제한해서 보여주기
      if (isLong && !isMultiTag) {
        return (
          <div className="flex gap-0.5 text-sm text-[#374151]">
            {selectedTagsResult.map((el) => (
              <div
                key={el}
                className="max-w-[210px] truncate rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
              >
                {el}
              </div>
            ))}
          </div>
        )
      }

      // (3) 길이도 안 김 → 전부 그대로 노출
      return (
        <div className="flex gap-0.5 truncate text-sm text-[#374151]">
          {selectedTagsResult.map((el) => (
            <div
              key={el}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
            >
              {el}
            </div>
          ))}
        </div>
      )
    }

    // -----------------------------
    // 2) 한글이 포함된 경우
    // -----------------------------
    const isLongKorean = joined.length > 16

    if (isLongKorean) {
      const koreanVisible = selectedTagsResult
        .join('&^')
        .slice(0, 16)
        .split('&^')

      const restCount = selectedTagsResult.length - koreanVisible.length

      return (
        <div className="flex gap-0.5 truncate text-sm text-[#374151]">
          {koreanVisible.map((el) => (
            <div
              key={el}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
            >
              {el}
            </div>
          ))}
          {restCount > 0 && (
            <div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
              {`+ ${restCount}`}
            </div>
          )}
        </div>
      )
    }

    // (한글인데 전체 길이는 안 김) → 그대로 노출
    return (
      <div className="flex gap-0.5 truncate text-sm text-[#374151]">
        {selectedTagsResult.map((el) => (
          <div
            key={el}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
          >
            {el}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <SearchInput
        className="mr-4"
        labelClassName={LABEL_STYLE}
        searchClassName={BOX_STYLE}
        inputClassName="outline-0 focus:ring-0 focus:border-gray-300"
        placeholder="공고명 검색"
        value={keyword}
        onChange={setKeyword}
      />

      <FilterSelect
        className="mr-4"
        key={status}
        label="공고 상태"
        labelClassName={LABEL_STYLE}
        selectClassName={BOX_STYLE}
        options={[
          { label: '모집중', value: 'false' },
          { label: '마감', value: 'true' },
        ]}
        value={status}
        onChange={setStatus}
        placeholder="전체"
      />

      <div className="flex flex-col">
        <div
          className={twMerge(clsx('mb-2 text-sm font-medium text-[##374151]'))}
        >
          태그 필터
        </div>
        <div
          onClick={openModal}
          className={twMerge(
            clsx(
              'flex cursor-pointer items-center justify-between rounded-lg border border-[#D1D5DB] px-3 py-2',
              BOX_STYLE
            )
          )}
        >
          {TagsResult()}
          <ListFilter className="w-4 text-[#9CA3AF]" />
        </div>
      </div>
    </>
  )
}
